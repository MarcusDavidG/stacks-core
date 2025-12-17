# Secure Escrow - Trustless P2P Transactions

**Built for Stacks Builder Challenge by Marcus David**

## Deployed Contract

**Testnet Address:** `ST3P3DPDB69YP0Z259SS6MSA16GBQEBF8KG8P96D2.secure-escrow`

**Explorer:** [View on Stacks Explorer](https://explorer.hiro.so/txid/ST3P3DPDB69YP0Z259SS6MSA16GBQEBF8KG8P96D2.secure-escrow?chain=testnet)

**Deployer:** `ST3P3DPDB69YP0Z259SS6MSA16GBQEBF8KG8P96D2`

##  Overview
A decentralized escrow service for secure peer-to-peer transactions on Stacks. Features buyer/seller protection, arbiter dispute resolution, and platform fees. Demonstrates **Clarity 4's post-condition enforcement** patterns for enhanced security.

##  Key Features
- **Trustless escrow**: STX held securely until delivery confirmed
- **Dispute resolution**: Third-party arbiter for conflicts
- **Platform fees**: Configurable fee system (2% default)
- **Multi-party trust**: Buyer, seller, and arbiter roles
- **State management**: Clear escrow lifecycle tracking

##  Use Cases
- NFT marketplace escrow
- Freelance payment protection
- P2P trading with guarantees
- Service delivery verification

##  Contract Functions

### Public Functions
- `create-escrow(seller, arbiter, amount, description)` - Create new escrow
- `fund-escrow(escrow-id)` - Buyer deposits funds
- `release-funds(escrow-id)` - Buyer confirms delivery, releases to seller
- `refund-escrow(escrow-id)` - Seller or arbiter refunds buyer
- `resolve-dispute(escrow-id, release-to-seller)` - Arbiter decides outcome
- `set-platform-fee(rate)` - Admin updates fee (max 10%)

### Read-Only Functions
- `get-escrow(escrow-id)` - Get escrow details
- `get-user-escrows(user)` - List user's escrows
- `get-platform-fee(amount)` - Calculate platform fee

##  Escrow States

1. **Pending** (u1): Escrow created, awaiting funding
2. **Funded** (u2): STX deposited, awaiting delivery
3. **Released** (u3): Funds sent to seller (completed)
4. **Refunded** (u4): Funds returned to buyer (cancelled)
5. **Disputed** (u5): Under arbiter review

##  How It Works

### Happy Path
1. Buyer creates escrow with seller address and arbiter
2. Buyer funds escrow with STX
3. Seller delivers goods/services
4. Buyer releases funds to seller
5. Platform fee deducted automatically

### Dispute Path
1. Buyer creates and funds escrow
2. Seller delivers, but buyer disputes quality
3. Arbiter investigates
4. Arbiter decides: release to seller OR refund to buyer

##  Platform Fees
- Default: 2% (200 basis points)
- Maximum: 10% (1000 basis points)
- Only charged on successful releases
- Paid to contract owner

##  Deployment

```bash
# Check contract
clarinet check

# Test locally
clarinet test

# Deploy to testnet
clarinet deploy --testnet
```

##  Clarity 4 Features

This contract demonstrates:
- **Post-condition patterns** for secure asset transfers
- **Multi-party transaction logic**
- **State machine design** in Clarity
- **Role-based access control**

##  Security Considerations
- Funds held in contract until resolution
- Arbiter cannot steal funds, only decide destination
- Platform fee capped at 10%
- State transitions carefully controlled

##  Built For
-  Stacks Builder Challenge (Dec 10-14, 2024)
-  Demonstrating DeFi escrow patterns on Bitcoin L2

##  License
MIT License

##  Author
Marcus David
