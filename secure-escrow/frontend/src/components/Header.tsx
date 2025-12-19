'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { userSession, formatAddress, getUserBalance, formatSTX } from '@/lib/stacks';
import { Wallet } from 'lucide-react';
import MobileNav from '@/components/MobileNav';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [loadingBalance, setLoadingBalance] = useState(false);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setIsConnected(true);
      const userData = userSession.loadUserData();
      const address = userData.profile.stxAddress.testnet;
      setUserAddress(address);
      loadBalance(address);
    }
  }, []);

  const loadBalance = async (address: string) => {
    setLoadingBalance(true);
    try {
      const bal = await getUserBalance(address);
      setBalance(bal);
    } catch (error) {
      console.error('Error loading balance:', error);
    } finally {
      setLoadingBalance(false);
    }
  };

  const connectWallet = async () => {
    if (!userSession.isUserSignedIn()) {
      const { authenticate } = await import('@stacks/connect');
      authenticate({
        appDetails: {
          name: 'BTC Bridge Helper',
          icon: window.location.origin + '/favicon.ico',
        },
        onFinish: () => {
          if (userSession.isUserSignedIn()) {
            const userData = userSession.loadUserData();
            const address = userData.profile.stxAddress.testnet;
            setIsConnected(true);
            setUserAddress(address);
            loadBalance(address);
          }
        },
        userSession,
      });
    }
  };

  const disconnectWallet = () => {
    userSession.signUserOut();
    setIsConnected(false);
    setUserAddress('');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900">BTC Bridge Helper</h1>
            </div>
          </div>

          {/* Center Navigation - Desktop Only */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link href="/">
              <span
                className={`px-4 py-2 rounded-md font-medium transition-all cursor-pointer ${
                  pathname === '/'
                    ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Home
              </span>
            </Link>
            <Link href="/chainhooks">
              <span
                className={`px-4 py-2 rounded-md font-medium transition-all cursor-pointer ${
                  pathname === '/chainhooks'
                    ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Chainhooks
              </span>
            </Link>
          </nav>

          {/* Wallet Connection & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            {isConnected ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                  <Wallet className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-900">
                    {loadingBalance ? '...' : formatSTX(balance)} STX
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 md:space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {userAddress.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-slate-600 hidden lg:inline">
                    {formatAddress(userAddress)}
                  </span>
                  <Button variant="outline" size="sm" onClick={disconnectWallet} className="hidden sm:flex">
                    Disconnect
                  </Button>
                </div>
              </>
            ) : (
              <Button onClick={connectWallet} size="sm">
                Connect
              </Button>
            )}
            
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
