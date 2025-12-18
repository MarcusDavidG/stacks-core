import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from '../Header';
import * as navigation from 'next/navigation';

// Mock stacks
vi.mock('@/lib/stacks', () => ({
  userSession: {
    isUserSignedIn: vi.fn(() => false),
    loadUserData: vi.fn(() => ({
      profile: {
        stxAddress: {
          testnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        },
      },
    })),
    signUserOut: vi.fn(),
  },
  formatAddress: vi.fn((address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`),
}));

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header with logo and navigation', () => {
    render(<Header />);
    
    expect(screen.getByText('Strade')).toBeInTheDocument();
    expect(screen.getByText('Decentralized Marketplace')).toBeInTheDocument();
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
    expect(screen.getByText('My Listings')).toBeInTheDocument();
  });

  it('shows Connect Wallet button when not connected', () => {
    render(<Header />);
    
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    const marketplaceLink = screen.getByText('Marketplace').closest('a');
    const myListingsLink = screen.getByText('My Listings').closest('a');
    
    expect(marketplaceLink).toHaveAttribute('href', '/');
    expect(myListingsLink).toHaveAttribute('href', '/my-listings');
  });

  it('applies active styling to current page', () => {
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/');
    
    render(<Header />);
    
    const marketplaceSpan = screen.getByText('Marketplace');
    expect(marketplaceSpan).toHaveClass('text-slate-900', 'bg-slate-100');
  });

  it('applies hover styling to non-active links', () => {
    vi.spyOn(navigation, 'usePathname').mockReturnValue('/');
    
    render(<Header />);
    
    const myListingsSpan = screen.getByText('My Listings');
    expect(myListingsSpan).toHaveClass('text-slate-600', 'hover:text-slate-900');
  });
});
