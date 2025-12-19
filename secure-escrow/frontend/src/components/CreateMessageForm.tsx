'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Bitcoin, MessageSquare } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function CreateMessageForm() {
  const [btcAddress, setBtcAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [messageData, setMessageData] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      btcAddress,
      amount,
      messageData,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            BTC Bridge Helper
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create a cross-chain message to send to the Bitcoin network.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="btc-address" className="text-black dark:text-white">
              <Bitcoin className="inline-block w-4 h-4 mr-2" />
              BTC Address
            </Label>
            <Input
              id="btc-address"
              type="text"
              placeholder="Enter Bitcoin address"
              value={btcAddress}
              onChange={(e) => setBtcAddress(e.target.value)}
              required
              className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-black dark:text-white">
              <span className="inline-block w-4 h-4 mr-2">💰</span>
              Amount (in STX)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message-data" className="text-black dark:text-white">
              <MessageSquare className="inline-block w-4 h-4 mr-2" />
              Message Data
            </Label>
            <Textarea
              id="message-data"
              placeholder="Enter message data"
              value={messageData}
              onChange={(e) => setMessageData(e.target.value)}
              required
              className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
          >
            Create Message
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
