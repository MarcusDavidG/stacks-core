'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ListingCard from '@/components/ListingCard';
import CreateListingForm from '@/components/CreateListingForm';
import TestnetBanner from '@/components/TestnetBanner';
import { ListingGridSkeleton } from '@/components/LoadingSkeleton';
import { getListings, userSession, Listing, contractAddress, contractName, getUserBalance } from '@/lib/stacks';
import { openContractCall } from '@stacks/connect';
import { uintCV, stringUtf8CV } from '@stacks/transactions';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, AlertTriangle, ArrowUpDown } from 'lucide-react';

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'ending-soon'>('newest');

  useEffect(() => {
    loadListings();
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setUserAddress(userData.profile.stxAddress.testnet);
    }
  }, []);

  const loadListings = async () => {
    try {
      const fetchedListings = await getListings();
      setListings(fetchedListings);
    } catch (error) {
      console.error('Error loading listings:', error);
      toast.error('Failed to load listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateListing = async (data: {
    name: string;
    description: string;
    price: number;
    duration: number;
    imageUrl?: string;
  }) => {
    if (!userSession.isUserSignedIn()) {
      toast.error('Please connect your wallet first');
      return;
    }

    const functionArgs = [
      stringUtf8CV(data.name),
      stringUtf8CV(data.description),
      uintCV(data.price),
      uintCV(data.duration),
    ];

    const options = {
      contractAddress,
      contractName,
      functionName: 'create-listing',
      functionArgs,
      appDetails: {
        name: 'Strade',
        icon: window.location.origin + '/favicon.ico',
      },
      onFinish: (result: { txId: string; stacksTransaction: unknown }) => {
        console.log('Transaction finished:', result);
        toast.success('Listing created successfully!', {
          description: `Transaction ID: ${result.txId.slice(0, 10)}...`,
        });
        // Reload listings after successful creation
        setTimeout(loadListings, 3000);
      },
      onCancel: () => {
        toast.info('Transaction cancelled');
      },
    };

    try {
      toast.loading('Waiting for transaction approval...');
      await openContractCall(options);
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing');
    }
  };

  const handlePurchaseListing = async (listingId: number) => {
    if (!userSession.isUserSignedIn()) {
      toast.error('Please connect your wallet first');
      return;
    }

    // Find the listing to check price
    const listing = listings.find(l => l.listingId === listingId);
    if (!listing) {
      toast.error('Listing not found');
      return;
    }

    // Check user balance
    try {
      const userData = userSession.loadUserData();
      const address = userData.profile.stxAddress.testnet;
      const balance = await getUserBalance(address);
      
      if (balance < listing.price) {
        toast.error('Insufficient balance', {
          description: `You need ${(listing.price / 1000000).toFixed(6)} STX but only have ${(balance / 1000000).toFixed(6)} STX`,
          icon: <AlertTriangle className="h-5 w-5" />,
        });
        return;
      }
    } catch (error) {
      console.error('Error checking balance:', error);
    }

    const functionArgs = [uintCV(listingId)];

    const options = {
      contractAddress,
      contractName,
      functionName: 'purchase-listing',
      functionArgs,
      appDetails: {
        name: 'Strade',
        icon: window.location.origin + '/favicon.ico',
      },
      onFinish: (result: { txId: string; stacksTransaction: unknown }) => {
        console.log('Purchase transaction finished:', result);
        toast.success('Purchase successful!', {
          description: `Transaction ID: ${result.txId.slice(0, 10)}...`,
        });
        // Reload listings after successful purchase
        setTimeout(loadListings, 3000);
      },
      onCancel: () => {
        toast.info('Purchase cancelled');
      },
    };

    try {
      toast.loading('Processing purchase...');
      await openContractCall(options);
    } catch (error) {
      console.error('Error purchasing listing:', error);
      toast.error('Failed to purchase listing');
    }
  };

  const handleCancelListing = async (listingId: number) => {
    if (!userSession.isUserSignedIn()) {
      toast.error('Please connect your wallet first');
      return;
    }

    const functionArgs = [uintCV(listingId)];

    const options = {
      contractAddress,
      contractName,
      functionName: 'cancel-listing',
      functionArgs,
      appDetails: {
        name: 'Strade',
        icon: window.location.origin + '/favicon.ico',
      },
      onFinish: (result: { txId: string; stacksTransaction: unknown }) => {
        console.log('Cancel transaction finished:', result);
        toast.success('Listing cancelled successfully!', {
          description: `Transaction ID: ${result.txId.slice(0, 10)}...`,
        });
        // Reload listings after successful cancellation
        setTimeout(loadListings, 3000);
      },
      onCancel: () => {
        toast.info('Cancellation cancelled');
      },
    };

    try {
      toast.loading('Cancelling listing...');
      await openContractCall(options);
    } catch (error) {
      console.error('Error cancelling listing:', error);
      toast.error('Failed to cancel listing');
    }
  };

  // Filter and sort listings
  const filteredListings = listings
    .filter((listing) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        listing.name.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'ending-soon':
          return a.expiresAt - b.expiresAt;
        case 'newest':
        default:
          return b.listingId - a.listingId;
      }
    });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TestnetBanner />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Decentralized Marketplace
          </h1>
          <p className="text-slate-600">
            Buy and sell goods securely using smart contracts on the Stacks blockchain
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <CreateListingForm onCreateListing={handleCreateListing} />
            
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={(value: 'newest' | 'price-low' | 'price-high' | 'ending-soon') => setSortBy(value)}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredListings.length > 0 && (
            <div className="text-sm text-slate-600">
              Showing {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'}
            </div>
          )}
        </div>

        {loading ? (
          <ListingGridSkeleton count={6} />
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">
              {searchQuery ? 'No listings match your search.' : 'No active listings found.'}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              {searchQuery ? 'Try a different search term.' : 'Be the first to create a listing!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.listingId}
                listing={listing}
                onPurchase={handlePurchaseListing}
                onCancel={handleCancelListing}
                isOwner={listing.seller === userAddress}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
