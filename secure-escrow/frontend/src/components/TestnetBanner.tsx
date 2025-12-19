'use client';

import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function TestnetBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-orange-500 text-white py-3 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">
          <strong>TESTNET MODE:</strong> This is a test network. STX tokens have no real value. 
          Do not use real assets.
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 hover:bg-orange-600 rounded p-1 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
