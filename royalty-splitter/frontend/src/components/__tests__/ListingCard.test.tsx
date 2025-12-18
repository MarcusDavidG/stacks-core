import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ListingCard from '../ListingCard';
import { Listing } from '@/lib/stacks';

const mockListing: Listing = {
  listingId: 1,
  seller: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  name: 'Test Item',
  description: 'A test item for sale',
  price: 1000000,
  status: 'active',
  createdAt: 1000,
  expiresAt: Math.floor(Date.now() / 1000) + 86400, // 1 day from now
};

describe('ListingCard Component', () => {
  it('renders listing information correctly', () => {
    render(<ListingCard listing={mockListing} />);
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('A test item for sale')).toBeInTheDocument();
    expect(screen.getByText('1.000000 STX')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('shows Purchase button for non-owner active listings', () => {
    render(<ListingCard listing={mockListing} isOwner={false} />);
    
    expect(screen.getByText('Purchase')).toBeInTheDocument();
  });

  it('shows "Your listing" text for owner', () => {
    render(<ListingCard listing={mockListing} isOwner={true} />);
    
    expect(screen.getByText('Your listing')).toBeInTheDocument();
    expect(screen.queryByText('Purchase')).not.toBeInTheDocument();
  });

  it('calls onPurchase when Purchase button is clicked', async () => {
    const onPurchase = vi.fn();
    render(<ListingCard listing={mockListing} onPurchase={onPurchase} isOwner={false} />);
    
    const purchaseButton = screen.getByText('Purchase');
    fireEvent.click(purchaseButton);
    
    expect(onPurchase).toHaveBeenCalledWith(1);
  });

  it('shows expired badge for expired listings', () => {
    const expiredListing = {
      ...mockListing,
      expiresAt: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
    };
    
    render(<ListingCard listing={expiredListing} />);
    
    expect(screen.getByText('Expired')).toBeInTheDocument();
  });

  it('shows "Not available" for sold listings', () => {
    const soldListing = {
      ...mockListing,
      status: 'sold',
    };
    
    render(<ListingCard listing={soldListing} isOwner={false} />);
    
    expect(screen.getByText('Not available')).toBeInTheDocument();
    expect(screen.queryByText('Purchase')).not.toBeInTheDocument();
  });

  it('formats seller address correctly', () => {
    render(<ListingCard listing={mockListing} />);
    
    // The actual formatted address from formatAddress function
    expect(screen.getByText('ST1PQH...GZGM')).toBeInTheDocument();
  });

  it('displays expiration date', () => {
    render(<ListingCard listing={mockListing} />);
    
    const expirationText = screen.getByText(/Expires:/);
    expect(expirationText).toBeInTheDocument();
  });
});
