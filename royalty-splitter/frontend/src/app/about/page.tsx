'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestnetBanner from '@/components/TestnetBanner';
import { Shield, Target, Zap, Heart } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function AboutPage() {
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
                Building the Future of
                <br />
                Decentralized Commerce
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Strade is a decentralized marketplace built on the Stacks blockchain,
                enabling secure peer-to-peer transactions without intermediaries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-black dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We believe that commerce should be accessible, transparent, and secure
                  for everyone. Traditional marketplaces are controlled by centralized
                  entities that charge high fees, censor content, and own your data.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Strade empowers users to trade directly with each other using blockchain
                  technology, eliminating middlemen while ensuring security through smart
                  contracts and community governance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { icon: Shield, title: 'Security First', desc: 'Smart contract protection' },
                  { icon: Target, title: 'User Focused', desc: 'Built for traders' },
                  { icon: Zap, title: 'Fast & Efficient', desc: 'Instant settlements' },
                  { icon: Heart, title: 'Community Driven', desc: 'Open governance' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg"
                  >
                    <item.icon className="h-8 w-8 text-black dark:text-white mb-3" />
                    <h3 className="font-semibold text-black dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-24 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                Built on Stacks
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Leveraging Bitcoin's security with smart contract capabilities
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  title: 'Bitcoin Security',
                  description: 'Stacks brings smart contracts to Bitcoin, inheriting its unmatched security and decentralization.'
                },
                {
                  title: 'Clarity Smart Contracts',
                  description: 'Our contracts are written in Clarity, a decidable language that prevents common vulnerabilities.'
                },
                {
                  title: 'Proof of Transfer',
                  description: 'Stacks uses PoX consensus to anchor to Bitcoin, providing the security of Bitcoin without its energy cost.'
                },
                {
                  title: 'Open Source',
                  description: 'All our smart contracts are open source and verified on-chain for complete transparency.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-black dark:text-white mb-12">
                Our Core Values
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Transparency',
                    description: 'All transactions and contract logic are visible on-chain'
                  },
                  {
                    title: 'Decentralization',
                    description: 'No single entity controls the marketplace'
                  },
                  {
                    title: 'Innovation',
                    description: 'Constantly improving with the latest blockchain technology'
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
