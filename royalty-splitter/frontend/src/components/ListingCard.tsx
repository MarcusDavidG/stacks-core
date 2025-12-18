'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Listing, formatSTX, formatAddress } from '@/lib/stacks';
import { ShoppingCart, Clock, User, Package } from 'lucide-react';
import Image from 'next/image';

interface ListingCardProps {
  listing: Listing;
  onPurchase?: (listingId: number) => void;
  onCancel?: (listingId: number) => void;
  isOwner?: boolean;
}

export default function ListingCard({ listing, onPurchase, onCancel, isOwner }: ListingCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handlePurchase = async () => {
    if (onPurchase) {
      setIsPurchasing(true);
      try {
        await onPurchase(listing.listingId);
      } finally {
        setIsPurchasing(false);
      }
    }
  };

  const handleCancel = async () => {
    if (onCancel) {
      setIsCancelling(true);
      try {
        await onCancel(listing.listingId);
      } finally {
        setIsCancelling(false);
      }
    }
  };

  const isExpired = listing.expiresAt < Date.now() / 1000;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      {/* Image Section */}
      {listing.imageUrl ? (
        <div className="relative w-full h-48 bg-slate-100">
          <Image
            src={listing.imageUrl}
            alt={listing.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-slate-100 flex items-center justify-center rounded-t-lg">
          <Package className="h-16 w-16 text-slate-300" />
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{listing.name}</CardTitle>
          <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
            {listing.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <User className="h-4 w-4" />
          <span>{formatAddress(listing.seller)}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-slate-700 text-sm mb-4 line-clamp-3">
          {listing.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900">
              {formatSTX(listing.price)} STX
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            <span>
              Expires: {new Date(listing.expiresAt * 1000).toLocaleDateString()}
            </span>
          </div>

          {isExpired && (
            <Badge variant="destructive" className="text-xs">
              Expired
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        {!isOwner && listing.status === 'active' && !isExpired && (
          <Button
            onClick={handlePurchase}
            disabled={isPurchasing}
            className="w-full"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isPurchasing ? 'Purchasing...' : 'Purchase'}
          </Button>
        )}

        {isOwner && listing.status === 'active' && !isExpired && (
          <div className="w-full space-y-2">
            <div className="text-center text-sm text-slate-500 mb-2">
              Your listing
            </div>
            <Button
              onClick={handleCancel}
              disabled={isCancelling}
              variant="destructive"
              className="w-full"
              size="sm"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Listing'}
            </Button>
          </div>
        )}

        {isOwner && (listing.status !== 'active' || isExpired) && (
          <div className="w-full text-center text-sm text-slate-500">
            Your listing ({isExpired ? 'expired' : listing.status})
          </div>
        )}

        {(isExpired || listing.status !== 'active') && !isOwner && (
          <div className="w-full text-center text-sm text-slate-500">
            Not available
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
