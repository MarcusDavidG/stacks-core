;; Royalty Splitter - Automatic payment distribution
;; Built for Stacks Builder Challenge by Marcus David

(define-constant contract-owner tx-sender)
(define-constant err-unauthorized (err u102))
(define-constant err-invalid-split (err u103))

(define-data-var next-split-id uint u1)

(define-map splits
  uint
  {
    recipient1: principal,
    recipient2: principal,
    recipient3: (optional principal),
    percent1: uint,
    percent2: uint,
    percent3: uint,
    total-received: uint
  }
)

(define-read-only (get-split (split-id uint))
  (map-get? splits split-id)
)

(define-public (create-split 
    (r1 principal) (r2 principal) (r3 (optional principal))
    (p1 uint) (p2 uint) (p3 uint))
  (let ((split-id (var-get next-split-id)))
    (asserts! (is-eq (+ (+ p1 p2) p3) u100) err-invalid-split)
    (map-set splits split-id {
      recipient1: r1,
      recipient2: r2,
      recipient3: r3,
      percent1: p1,
      percent2: p2,
      percent3: p3,
      total-received: u0
    })
    (var-set next-split-id (+ split-id u1))
    (ok split-id)
  )
)

(define-public (distribute (split-id uint) (amount uint))
  (match (map-get? splits split-id)
    split
      (let
        (
          (amount1 (/ (* amount (get percent1 split)) u100))
          (amount2 (/ (* amount (get percent2 split)) u100))
          (amount3 (/ (* amount (get percent3 split)) u100))
        )
        (try! (stx-transfer-memo? amount tx-sender (as-contract tx-sender) 0x726f79616c74792072656365697665))
        (try! (as-contract (stx-transfer-memo? amount1 tx-sender (get recipient1 split) 0x726f79616c74792073706c6974)))
        (try! (as-contract (stx-transfer-memo? amount2 tx-sender (get recipient2 split) 0x726f79616c74792073706c6974)))
        (match (get recipient3 split)
          r3 (try! (as-contract (stx-transfer-memo? amount3 tx-sender r3 0x726f79616c74792073706c6974)))
          true
        )
        (map-set splits split-id (merge split {
          total-received: (+ (get total-received split) amount)
        }))
        (ok true)
      )
    (err u101)
  )
)
