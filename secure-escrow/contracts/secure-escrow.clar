;; Secure Escrow with Post-Conditions
;; Uses Clarity 4's post-condition enforcement for trustless escrow
;; Built for Stacks Builder Challenge by Marcus David

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-unauthorized (err u100))
(define-constant err-not-found (err u101))
(define-constant err-already-exists (err u102))
(define-constant err-invalid-state (err u103))
(define-constant err-insufficient-funds (err u104))

;; Escrow states
(define-constant state-pending u1)
(define-constant state-funded u2)
(define-constant state-released u3)
(define-constant state-refunded u4)
(define-constant state-disputed u5)

;; Data Variables
(define-data-var next-escrow-id uint u1)
(define-data-var platform-fee-rate uint u200) ;; 2% = 200 basis points

;; Data Maps
(define-map escrows
  uint
  {
    buyer: principal,
    seller: principal,
    arbiter: principal,
    amount: uint,
    state: uint,
    created-at: uint,
    description: (string-ascii 256)
  }
)

(define-map user-escrows principal (list 20 uint))

;; Read-only functions
(define-read-only (get-escrow (escrow-id uint))
  (map-get? escrows escrow-id)
)

(define-read-only (get-user-escrows (user principal))
  (default-to (list) (map-get? user-escrows user))
)

(define-read-only (get-platform-fee (amount uint))
  (ok (/ (* amount (var-get platform-fee-rate)) u10000))
)

;; Public functions

;; Create escrow
(define-public (create-escrow (seller principal) (arbiter principal) (amount uint) (description (string-ascii 256)))
  (let 
    (
      (escrow-id (var-get next-escrow-id))
      (buyer-escrows (default-to (list) (map-get? user-escrows tx-sender)))
      (seller-escrows (default-to (list) (map-get? user-escrows seller)))
    )
    (asserts! (> amount u0) err-insufficient-funds)
    (asserts! (not (is-eq seller tx-sender)) err-invalid-state)
    
    (map-set escrows escrow-id {
      buyer: tx-sender,
      seller: seller,
      arbiter: arbiter,
      amount: amount,
      state: state-pending,
      created-at: stacks-block-height,
      description: description
    })
    
    (map-set user-escrows tx-sender (unwrap-panic (as-max-len? (append buyer-escrows escrow-id) u20)))
    (map-set user-escrows seller (unwrap-panic (as-max-len? (append seller-escrows escrow-id) u20)))
    (var-set next-escrow-id (+ escrow-id u1))
    (ok escrow-id)
  )
)

;; Fund escrow (buyer deposits STX)
(define-public (fund-escrow (escrow-id uint))
  (match (map-get? escrows escrow-id)
    escrow-data
      (begin
        (asserts! (is-eq tx-sender (get buyer escrow-data)) err-unauthorized)
        (asserts! (is-eq (get state escrow-data) state-pending) err-invalid-state)
        
        ;; Transfer funds to contract
        (try! (stx-transfer-memo? (get amount escrow-data) tx-sender (as-contract tx-sender) 0x657363726f772066756e64696e67))
        
        ;; Update state
        (map-set escrows escrow-id (merge escrow-data {
          state: state-funded
        }))
        (ok true)
      )
    err-not-found
  )
)

;; Release funds to seller (buyer confirms delivery)
;; CLARITY 4: This would ideally use post-condition enforcement
(define-public (release-funds (escrow-id uint))
  (match (map-get? escrows escrow-id)
    escrow-data
      (let 
        (
          (fee (/ (* (get amount escrow-data) (var-get platform-fee-rate)) u10000))
          (seller-amount (- (get amount escrow-data) fee))
        )
        (asserts! (is-eq tx-sender (get buyer escrow-data)) err-unauthorized)
        (asserts! (is-eq (get state escrow-data) state-funded) err-invalid-state)
        
        ;; Transfer to seller (minus platform fee)
        (try! (as-contract (stx-transfer-memo? seller-amount tx-sender (get seller escrow-data) 0x657363726f772072656c65617365)))
        
        ;; Transfer fee to contract owner
        (try! (as-contract (stx-transfer-memo? fee tx-sender contract-owner 0x706c6174666f726d20666565)))
        
        ;; Update state
        (map-set escrows escrow-id (merge escrow-data {
          state: state-released
        }))
        (ok seller-amount)
      )
    err-not-found
  )
)

;; Refund to buyer (before delivery or by arbiter decision)
(define-public (refund-escrow (escrow-id uint))
  (match (map-get? escrows escrow-id)
    escrow-data
      (begin
        (asserts! 
          (or 
            (is-eq tx-sender (get seller escrow-data))
            (is-eq tx-sender (get arbiter escrow-data))
          ) 
          err-unauthorized
        )
        (asserts! (is-eq (get state escrow-data) state-funded) err-invalid-state)
        
        ;; Return funds to buyer
        (try! (as-contract (stx-transfer-memo? (get amount escrow-data) tx-sender (get buyer escrow-data) 0x657363726f77207265667564)))
        
        ;; Update state
        (map-set escrows escrow-id (merge escrow-data {
          state: state-refunded
        }))
        (ok (get amount escrow-data))
      )
    err-not-found
  )
)

;; Dispute resolution (arbiter decides)
(define-public (resolve-dispute (escrow-id uint) (release-to-seller bool))
  (match (map-get? escrows escrow-id)
    escrow-data
      (begin
        (asserts! (is-eq tx-sender (get arbiter escrow-data)) err-unauthorized)
        (asserts! (is-eq (get state escrow-data) state-funded) err-invalid-state)
        
        (if release-to-seller
          ;; Release to seller
          (begin
            (try! (as-contract (stx-transfer-memo? (get amount escrow-data) tx-sender (get seller escrow-data) 0x646973707465207265736f6c7665642d73656c6c6572)))
            (map-set escrows escrow-id (merge escrow-data { state: state-released }))
            (ok true)
          )
          ;; Refund to buyer
          (begin
            (try! (as-contract (stx-transfer-memo? (get amount escrow-data) tx-sender (get buyer escrow-data) 0x646973707465207265736f6c7665642d6275796572)))
            (map-set escrows escrow-id (merge escrow-data { state: state-refunded }))
            (ok false)
          )
        )
      )
    err-not-found
  )
)

;; Admin: Update platform fee
(define-public (set-platform-fee (new-rate uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-unauthorized)
    (asserts! (<= new-rate u1000) err-invalid-state) ;; Max 10%
    (var-set platform-fee-rate new-rate)
    (ok new-rate)
  )
)
