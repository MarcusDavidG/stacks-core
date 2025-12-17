# Social Recovery - Wallet Recovery Through Trusted Guardians

Secure wallet recovery mechanism using trusted friends and family as guardians.

## Features

- **Guardian Management**: Add/remove trusted guardians
- **Threshold Security**: Require M-of-N guardian approvals
- **Recovery Delay**: Time-lock for security
- **Multi-Sig Recovery**: Multiple guardians must approve
- **Cancel Option**: Wallet owner can cancel recovery

## Key Functions

### setup-recovery
Configure recovery settings with threshold and delay.

### add-guardian / remove-guardian
Manage trusted guardians for wallet recovery.

### initiate-recovery
Guardian starts recovery process for lost wallet.

### approve-recovery
Other guardians vote to approve recovery.

### execute-recovery
Execute recovery after threshold met and delay passed.

## Security Model

- M-of-N guardian approval required
- Time-delay prevents instant takeover
- Owner can cancel any recovery attempt
- Guardian votes are tracked on-chain

## Deployment

```bash
clarinet check
clarinet deploy --testnet
```
