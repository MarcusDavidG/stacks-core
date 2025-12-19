
import { ChainhooksClient, CHAINHOOKS_BASE_URL } from '@hirosystems/chainhooks-client';

if (!process.env.CHAINHOOKS_API_KEY) {
  throw new Error('CHAINHOOKS_API_KEY is not set');
}

export const chainhooksClient = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet,
  apiKey: process.env.CHAINHOOKS_API_KEY,
});

export const getChainhooks = async () => {
  try {
    const chainhooks = await chainhooksClient.getChainhooks();
    return chainhooks;
  } catch (error) {
    console.error('Error fetching chainhooks:', error);
    return null;
  }
};
