import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: vi.fn(() => '/'),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Stacks connect
vi.mock('@stacks/connect', async () => {
  return {
    AppConfig: vi.fn(),
    UserSession: vi.fn(),
    authenticate: vi.fn(),
    openContractCall: vi.fn(),
  };
});
