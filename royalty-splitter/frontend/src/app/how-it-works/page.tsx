'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestnetBanner from '@/components/TestnetBanner';
import { 
  Wallet, 
  List, 
  ShoppingCart, 
  Shield, 
  MessageSquare,
  CheckCircle,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const steps = [
  {
    icon: Wallet,
    title: 'Connect Your Wallet',
    description: 'Connect your Leather wallet or any Stacks-compatible wallet to get started. No sign-up required.',
    details: [
      'Install Leather wallet extension',
      'Create or import your wallet',
      'Connect to Strade with one click',
      'Your wallet, your keys, your control'
    ]
  },
  {
    icon: List,
    title: 'Create a Listing',
    description: 'List your items with detailed descriptions, prices, and durations. All transactions are protected by smart contracts.',
    details: [
      'Add item name and description',
      'Set your price in STX',
      'Choose listing duration',
      'Submit transaction to blockchain'
    ]
  },
  {
    icon: ShoppingCart,
    title: 'Browse & Purchase',
    description: 'Discover items from sellers worldwide. Purchase securely with automatic escrow protection.',
    details: [
      'Search and filter listings',
      'Review seller reputation',
      'Purchase with one transaction',
      'Funds held in smart contract escrow'
    ]
  },
  {
    icon: Shield,
    title: 'Escrow Protection',
    description: 'All purchases are protected by automatic escrow. Funds are only released when conditions are met.',
    details: [
      'Buyer sends STX to escrow',
      'Seller ships the item',
      'Buyer confirms receipt',
      'Funds automatically released to seller'
    ]
  },
  {
    icon: MessageSquare,
    title: 'Dispute Resolution',
    description: 'If issues arise, our community arbitration system ensures fair resolution for all parties.',
    details: [
      'Raise a dispute if needed',
      'Community arbitrators review',
      'Vote on fair resolution',
      'Automated execution of decision'
    ]
  },
  {
    icon: CheckCircle,
    title: 'Build Reputation',
    description: 'Rate transactions and build your on-chain reputation. Trust is earned and transparent.',
    details: [
      'Rate each transaction',
      'Receive ratings from others',
      'Reputation stored on-chain',
      'Build trust with the community'
    ]
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <TestnetBanner />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-6">
                How Strade Works
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Trading on Strade is simple, secure, and completely decentralized.
                Here's everything you need to know.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-4">
                        <div className="text-6xl font-bold text-gray-200 dark:text-gray-800">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center">
                          <step.icon className="h-8 w-8 text-white dark:text-black" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                          >
                            <ArrowRight className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-8 top-24 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -mb-24" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Contract Benefits */}
        <section className="py-24 bg-gray-50 dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                Why Smart Contracts Matter
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Traditional marketplaces require you to trust a middleman.
                Strade eliminates this need entirely.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Automated Escrow',
                  description: 'No need to trust the other party. Smart contracts hold funds until conditions are met.'
                },
                {
                  title: 'No Middlemen',
                  description: 'Trade directly with other users. No platform fees, no censorship, no data collection.'
                },
                {
                  title: 'Transparent Rules',
                  description: 'All contract logic is visible on-chain. Everyone plays by the same rules.'
                },
                {
                  title: 'Immutable Records',
                  description: 'All transactions are permanently recorded on the blockchain. Complete audit trail.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Join the decentralized marketplace revolution today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/marketplace">
                  <Button size="lg" className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-8">
                    Start Trading
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
