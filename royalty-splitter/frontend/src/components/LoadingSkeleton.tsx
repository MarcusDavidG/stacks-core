import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export function ListingCardSkeleton() {
  return (
    <Card className="h-full flex flex-col animate-pulse">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="h-6 bg-slate-200 rounded w-16"></div>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <div className="h-4 bg-slate-200 rounded w-24"></div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded w-4/6"></div>
        </div>

        <div className="space-y-2">
          <div className="h-8 bg-slate-200 rounded w-32"></div>
          <div className="h-4 bg-slate-200 rounded w-40"></div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="h-10 bg-slate-200 rounded w-full"></div>
      </CardFooter>
    </Card>
  );
}

export function ListingGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  );
}
