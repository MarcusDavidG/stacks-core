;; Social Recovery - Wallet Recovery Through Trusted Guardians
;; Recover wallet access using trusted friends/family as guardians

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-unauthorized (err u102))
(define-constant err-invalid-threshold (err u103))
(define-constant err-already-guardian (err u104))
(define-constant err-recovery-not-initiated (err u105))
(define-constant err-already-voted (err u106))
(define-constant err-insufficient-approvals (err u107))

;; Data Variables
(define-data-var recovery-nonce uint u0)

;; Data Maps
(define-map wallet-guardians
  { wallet: principal, guardian: principal }
  { added-at: uint, active: bool }
)

(define-map wallet-config
  { wallet: principal }
  {
    threshold: uint,
    guardian-count: uint,
    recovery-delay: uint
  }
)

(define-map recovery-requests
  { request-id: uint }
  {
    wallet: principal,
    new-owner: principal,
    approvals: uint,
    initiated-at: uint,
    executed: bool
  }
)

(define-map guardian-votes
  { request-id: uint, guardian: principal }
  { voted: bool, vote-time: uint }
)

(define-map user-recovery-request
  { wallet: principal }
  { request-id: uint }
)

;; Read-Only Functions
(define-read-only (is-guardian (wallet principal) (guardian principal))
  (match (map-get? wallet-guardians { wallet: wallet, guardian: guardian })
    entry (get active entry)
    false
  )
)

(define-read-only (get-wallet-config (wallet principal))
  (map-get? wallet-config { wallet: wallet })
)

(define-read-only (get-recovery-request (request-id uint))
  (map-get? recovery-requests { request-id: request-id })
)

(define-read-only (has-voted (request-id uint) (guardian principal))
  (match (map-get? guardian-votes { request-id: request-id, guardian: guardian })
    entry (get voted entry)
    false
  )
)

(define-read-only (get-active-recovery (wallet principal))
  (map-get? user-recovery-request { wallet: wallet })
)

;; Public Functions
(define-public (setup-recovery (threshold uint) (recovery-delay uint))
  (begin
    (asserts! (> threshold u0) err-invalid-threshold)
    
    (map-set wallet-config
      { wallet: tx-sender }
      {
        threshold: threshold,
        guardian-count: u0,
        recovery-delay: recovery-delay
      }
    )
    
    (ok true)
  )
)

(define-public (add-guardian (guardian principal))
  (let (
    (config (unwrap! (get-wallet-config tx-sender) err-not-found))
  )
    (asserts! (not (is-guardian tx-sender guardian)) err-already-guardian)
    
    (map-set wallet-guardians
      { wallet: tx-sender, guardian: guardian }
      { added-at: block-height, active: true }
    )
    
    (map-set wallet-config
      { wallet: tx-sender }
      (merge config {
        guardian-count: (+ (get guardian-count config) u1)
      })
    )
    
    (ok true)
  )
)

(define-public (remove-guardian (guardian principal))
  (let (
    (config (unwrap! (get-wallet-config tx-sender) err-not-found))
  )
    (asserts! (is-guardian tx-sender guardian) err-not-found)
    
    (map-set wallet-guardians
      { wallet: tx-sender, guardian: guardian }
      { added-at: block-height, active: false }
    )
    
    (map-set wallet-config
      { wallet: tx-sender }
      (merge config {
        guardian-count: (- (get guardian-count config) u1)
      })
    )
    
    (ok true)
  )
)

(define-public (initiate-recovery (wallet principal) (new-owner principal))
  (let (
    (config (unwrap! (get-wallet-config wallet) err-not-found))
    (request-id (+ (var-get recovery-nonce) u1))
  )
    (asserts! (is-guardian wallet tx-sender) err-unauthorized)
    
    (map-set recovery-requests
      { request-id: request-id }
      {
        wallet: wallet,
        new-owner: new-owner,
        approvals: u1,
        initiated-at: block-height,
        executed: false
      }
    )
    
    (map-set guardian-votes
      { request-id: request-id, guardian: tx-sender }
      { voted: true, vote-time: block-height }
    )
    
    (map-set user-recovery-request
      { wallet: wallet }
      { request-id: request-id }
    )
    
    (var-set recovery-nonce request-id)
    (ok request-id)
  )
)

(define-public (approve-recovery (request-id uint))
  (let (
    (request (unwrap! (get-recovery-request request-id) err-not-found))
    (config (unwrap! (get-wallet-config (get wallet request)) err-not-found))
  )
    (asserts! (is-guardian (get wallet request) tx-sender) err-unauthorized)
    (asserts! (not (has-voted request-id tx-sender)) err-already-voted)
    (asserts! (not (get executed request)) err-recovery-not-initiated)
    
    (map-set recovery-requests
      { request-id: request-id }
      (merge request {
        approvals: (+ (get approvals request) u1)
      })
    )
    
    (map-set guardian-votes
      { request-id: request-id, guardian: tx-sender }
      { voted: true, vote-time: block-height }
    )
    
    (ok true)
  )
)

(define-public (execute-recovery (request-id uint))
  (let (
    (request (unwrap! (get-recovery-request request-id) err-not-found))
    (config (unwrap! (get-wallet-config (get wallet request)) err-not-found))
  )
    (asserts! (>= (get approvals request) (get threshold config)) err-insufficient-approvals)
    (asserts! (>= (- block-height (get initiated-at request)) (get recovery-delay config)) err-recovery-not-initiated)
    (asserts! (not (get executed request)) err-already-voted)
    
    (map-set recovery-requests
      { request-id: request-id }
      (merge request { executed: true })
    )
    
    (ok true)
  )
)

(define-public (cancel-recovery (request-id uint))
  (let (
    (request (unwrap! (get-recovery-request request-id) err-not-found))
  )
    (asserts! (is-eq tx-sender (get wallet request)) err-unauthorized)
    (asserts! (not (get executed request)) err-already-voted)
    
    (map-delete user-recovery-request { wallet: (get wallet request) })
    
    (ok true)
  )
)
