
import { getChainhooks } from '@/lib/chainhooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function ChainhooksPage() {
  const chainhooks = await getChainhooks();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Chainhooks</h1>
          <a
            href="https://docs.hiro.so/chainhooks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline flex items-center"
          >
            Learn more about Chainhooks
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Chainhooks are used to monitor the Stacks blockchain for specific events and trigger actions.
          In the BTC Bridge Helper, they can be used to confirm messages on the Bitcoin network.
        </p>
        {chainhooks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chainhooks.results.map((hook) => (
              <Card key={hook.uuid}>
                <CardHeader>
                  <CardTitle>{hook.definition.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Chain:</strong> {hook.definition.chain}</p>
                  <p><strong>Network:</strong> {hook.definition.network}</p>
                  <p><strong>Status:</strong> {hook.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>Could not load chainhooks.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
