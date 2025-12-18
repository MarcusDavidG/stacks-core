
import { getChainhooks } from '@/lib/chainhooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ChainhooksPage() {
  const chainhooks = await getChainhooks();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Chainhooks</h1>
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
  );
}
