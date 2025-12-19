import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestnetBanner from '@/components/TestnetBanner';
import CreateMessageForm from '@/components/CreateMessageForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <TestnetBanner />
      <Header />
      <CreateMessageForm />
      <Footer />
    </div>
  );
}
