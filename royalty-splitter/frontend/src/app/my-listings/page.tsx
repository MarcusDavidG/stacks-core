'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestnetBanner from '@/components/TestnetBanner';
import ListingCard from '@/components/ListingCard';
import { ListingGridSkeleton } from '@/components/LoadingSkeleton';
import { getListings, userSession, Listing, contractAddress, contractName } from '@/lib/stacks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';

type StatusFilter = 'all' | 'active' | 'sold' | 'expired';

export default function MyListings() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  useEffect(() => {
    if (!userSession.isUserSignedIn()) {
      // Redirect to home if not connected
      router.push('/');
      return;
    }

    const userData = userSession.loadUserData();
    const address = userData.profile.stxAddress.testnet;
    loadMyListings(address);
  }, [router]);

  const loadMyListings = async (address: string) => {
    try {
      // Fetch all listings including sold and expired ones
      const allListings = await getListings(true);
      // Filter to show all user's listings (not just active)
      const myListings = allListings.filter(
        (listing) => listing.seller.toLowerCase() === address.toLowerCase()
      );
      setListings(myListings);
    } catch (error) {
      console.error('Error loading listings:', error);
      toast.error('Failed to load your listings');
    } finally {
      setLoading(false);
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
        const userData = userSession.loadUserData();
        const address = userData.profile.stxAddress.testnet;
        setTimeout(() => loadMyListings(address), 3000);
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

  // Calculate statistics
  const stats = {
    total: listings.length,
    active: listings.filter((l) => l.status === 'active' && l.expiresAt > Date.now() / 1000).length,
    sold: listings.filter((l) => l.status === 'sold').length,
    expired: listings.filter((l) => l.expiresAt < Date.now() / 1000 && l.status === 'active').length,
  };

  // Filter listings based on selected status
  const filteredListings = listings.filter((listing) => {
    const isExpired = listing.expiresAt < Date.now() / 1000;
    
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return listing.status === 'active' && !isExpired;
    if (statusFilter === 'sold') return listing.status === 'sold';
    if (statusFilter === 'expired') return isExpired && listing.status === 'active';
    return true;
  });

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: number;
    color: string;
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = () => (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="p-6 bg-slate-100 rounded-full">
            <Package className="h-16 w-16 text-slate-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          No listings yet
        </h3>
        <p className="text-slate-600 mb-8">
          Start selling on the decentralized marketplace by creating your first listing.
        </p>
        <Button 
          size="lg" 
          onClick={() => router.push('/')}
          className="shadow-lg hover:shadow-xl transition-shadow"
        >
          Create Your First Listing
        </Button>
      </div>
    </div>
  );

  const FilterButton = ({ 
    filter, 
    label, 
    count 
  }: { 
    filter: StatusFilter; 
    label: string; 
    count: number;
  }) => (
    <button
      onClick={() => setStatusFilter(filter)}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        statusFilter === filter
          ? 'bg-slate-900 text-white shadow-md'
          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
      }`}
    >
      {label}
      <Badge 
        variant={statusFilter === filter ? 'secondary' : 'outline'} 
        className="ml-2"
      >
        {count}
      </Badge>
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <TestnetBanner />
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Listings</h1>
          </div>
          <ListingGridSkeleton count={6} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TestnetBanner />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            My Listings
          </h1>
          <p className="text-slate-600">
            Manage and track all your marketplace listings
          </p>
        </div>

        {listings.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Package}
                label="Total Listings"
                value={stats.total}
                color="bg-blue-500"
              />
              <StatCard
                icon={TrendingUp}
                label="Active"
                value={stats.active}
                color="bg-green-500"
              />
              <StatCard
                icon={CheckCircle}
                label="Sold"
                value={stats.sold}
                color="bg-purple-500"
              />
              <StatCard
                icon={Clock}
                label="Expired"
                value={stats.expired}
                color="bg-orange-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="mb-8 flex flex-wrap gap-3">
              <FilterButton filter="all" label="All" count={stats.total} />
              <FilterButton filter="active" label="Active" count={stats.active} />
              <FilterButton filter="sold" label="Sold" count={stats.sold} />
              <FilterButton filter="expired" label="Expired" count={stats.expired} />
            </div>

            {/* Listings Grid */}
            {filteredListings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                <XCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">
                  No {statusFilter !== 'all' ? statusFilter : ''} listings found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => {
                  const isExpired = listing.expiresAt < Date.now() / 1000;
                  const displayStatus = isExpired && listing.status === 'active' ? 'expired' : listing.status;
                  
                  return (
                    <div key={listing.listingId} className="relative">
                      {/* Status Badge Overlay */}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge
                          variant={
                            displayStatus === 'active' ? 'default' :
                            displayStatus === 'sold' ? 'secondary' :
                            'destructive'
                          }
                          className="shadow-md"
                        >
                          {displayStatus.toUpperCase()}
                        </Badge>
                      </div>
                      <ListingCard
                        listing={listing}
                        onCancel={handleCancelListing}
                        isOwner={true}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
