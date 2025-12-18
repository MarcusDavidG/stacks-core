'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Shield, 
  Zap, 
  Users, 
  Lock, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Code
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: Shield,
    title: 'Secure Escrow',
    description: 'Trustless transactions with automated smart contract escrow protection'
  },
  {
    icon: Users,
    title: 'Reputation System',
    description: 'Build trust with transparent on-chain ratings and reputation scores'
  },
  {
    icon: Lock,
    title: 'Dispute Resolution',
    description: 'Fair arbitration through community-based voting mechanism'
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'Fast transactions powered by Stacks blockchain finality'
  },
  {
    icon: Globe,
    title: 'Decentralized',
    description: 'No middlemen, no censorship, complete ownership of your data'
  },
  {
    icon: Code,
    title: 'Open Source',
    description: 'Transparent smart contracts verified on-chain with Clarity 4'
  }
];

const stats = [
  { value: '5', label: 'Smart Contracts' },
  { value: '100%', label: 'Decentralized' },
  { value: '0', label: 'Platform Fees' },
  { value: '$0.43', label: 'Deploy Cost' }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black" />
        
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-black dark:border-white">
                <Sparkles className="h-3 w-3 mr-2 inline" />
                Built on Stacks • Powered by Bitcoin
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-white mb-6"
            >
              Trade Without
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Trust Issues
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10"
            >
              A decentralized marketplace where smart contracts ensure security, 
              escrow protects transactions, and blockchain guarantees transparency.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/marketplace">
                <Button size="lg" className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-8 h-12">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 px-8 h-12">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4"
            >
              Everything You Need for Safe Trading
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Built with security, transparency, and user experience in mind
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-shadow bg-white dark:bg-black"
              >
                <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white dark:text-black" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Trading on Strade is simple and secure
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                title: 'Connect Your Wallet',
                description: 'Use Leather or any Stacks-compatible wallet to get started'
              },
              {
                step: '02',
                title: 'Create or Browse',
                description: 'List your items or discover what others are selling'
              },
              {
                step: '03',
                title: 'Trade Securely',
                description: 'Smart contracts handle escrow and ensure safe transactions'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative text-center"
              >
                <div className="text-6xl font-bold text-gray-200 dark:text-gray-800 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300 dark:text-gray-700" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black dark:bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-white dark:text-black mb-4"
            >
              Ready to Start Trading?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-400 dark:text-gray-600 mb-8"
            >
              Join the decentralized marketplace revolution today
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/marketplace">
                <Button size="lg" className="bg-white hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-800 text-black dark:text-white px-8 h-12">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
