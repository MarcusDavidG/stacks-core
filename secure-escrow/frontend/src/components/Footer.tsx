import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">BTC Bridge Helper</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A cross-chain messaging and formatting system for Bitcoin-Stacks interoperability.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a 
                  href="https://www.stacks.co/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Stacks Blockchain
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://explorer.hiro.so/?chain=testnet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Testnet Explorer
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/clarity-forge/btc-bridge-helper"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <Github className="h-3 w-3" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 BTC Bridge Helper. Built on Stacks blockchain. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Testnet version - For demonstration purposes only
          </p>
        </div>
      </div>
    </footer>
  );
}
