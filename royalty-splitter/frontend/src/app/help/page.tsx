'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestnetBanner from '@/components/TestnetBanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Shield, Wallet, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      question: 'What is Strade?',
      answer: 'Strade is a decentralized marketplace built on the Stacks blockchain. It allows users to buy and sell goods securely using smart contracts, without the need for intermediaries.',
    },
    {
      question: 'How do I connect my wallet?',
      answer: 'Click the "Connect Wallet" button in the header. You\'ll need a Stacks wallet like Hiro Wallet or Leather to interact with the marketplace.',
    },
    {
      question: 'How do I create a listing?',
      answer: 'Once your wallet is connected, click the "Create Listing" button on the marketplace page. Fill in the item details including name, description, price (in STX), and duration (in days). You can also upload an image to make your listing more attractive.',
    },
    {
      question: 'How do purchases work?',
      answer: 'When you click "Purchase" on a listing, a transaction will be initiated through your wallet. The STX amount will be transferred directly from your wallet to the seller. Once confirmed on the blockchain, the listing status will update to "sold".',
    },
    {
      question: 'Can I cancel my listing?',
      answer: 'Yes! If you\'re the seller and your listing is still active, you can cancel it from the "My Listings" page. Click the "Cancel Listing" button and confirm the transaction in your wallet.',
    },
    {
      question: 'What happens when a listing expires?',
      answer: 'Listings have a duration set by the seller. When this time passes, the listing automatically expires and can no longer be purchased. Expired listings can be viewed in the seller\'s "My Listings" page.',
    },
    {
      question: 'Is this real money?',
      answer: 'Currently, Strade is running on the Stacks testnet. The STX tokens used have no real value and are only for testing purposes. DO NOT use real assets on the testnet.',
    },
    {
      question: 'What are gas fees?',
      answer: 'Gas fees are transaction costs paid to process your transaction on the blockchain. These fees go to network miners, not to Strade. Your wallet will show you the estimated fee before you confirm any transaction.',
    },
  ];

  const safetyTips = [
    'Always verify the seller\'s address before making a purchase',
    'Check the listing expiration date to ensure sufficient time for transaction',
    'Make sure you have enough STX balance including gas fees',
    'Never share your private keys or seed phrase with anyone',
    'Double-check all transaction details before confirming in your wallet',
    'This is a testnet - never send real STX or valuable assets',
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TestnetBanner />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="h-8 w-8 text-slate-900" />
            <h1 className="text-3xl font-bold text-slate-900">Help & FAQ</h1>
          </div>
          <p className="text-slate-600">
            Everything you need to know about using Strade marketplace
          </p>
        </div>

        {/* Safety Tips */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-900">Safety Tips</CardTitle>
            </div>
            <CardDescription className="text-orange-700">
              Important reminders for safe marketplace usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-orange-800">
                  <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-blue-600" />
                <CardTitle>For Sellers</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p><strong>1.</strong> Connect your Stacks wallet</p>
              <p><strong>2.</strong> Click "Create Listing"</p>
              <p><strong>3.</strong> Fill in item details and set price</p>
              <p><strong>4.</strong> Confirm transaction in wallet</p>
              <p><strong>5.</strong> Manage listings in "My Listings"</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <CardTitle>For Buyers</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p><strong>1.</strong> Connect your Stacks wallet</p>
              <p><strong>2.</strong> Browse available listings</p>
              <p><strong>3.</strong> Check price and seller details</p>
              <p><strong>4.</strong> Click "Purchase" and confirm</p>
              <p><strong>5.</strong> Wait for blockchain confirmation</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>
              We're here to help you get the most out of Strade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>For technical issues or questions not covered here:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Check the Stacks blockchain explorer for transaction status</li>
              <li>Visit our GitHub repository for technical documentation</li>
              <li>Join our community Discord for support</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
