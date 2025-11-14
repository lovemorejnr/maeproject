import type {
  Customer,
  CustomerDashboardData,
  DashboardData,
  Dealership,
  DocumentVaultData,
  ReportsData,
  SalesAnalyticsData,
} from '../types';
import { mockDataProvider } from './mockDataProvider';

export interface CRMDataProvider {
  getDealerships(): Promise<Dealership[]>;
  getCustomers(): Promise<Customer[]>;
  getDashboardOverview(): Promise<DashboardData>;
  getCustomerDashboardOverview(): Promise<CustomerDashboardData>;
  getSalesAnalytics(): Promise<SalesAnalyticsData>;
  getDocumentVault(): Promise<DocumentVaultData>;
  getReports(): Promise<ReportsData>;
}

const providers: Record<string, CRMDataProvider> = {
  mock: mockDataProvider,
};

const resolveProvider = (): CRMDataProvider => {
  const providerKey =
    (import.meta.env.VITE_DATA_PROVIDER as string | undefined)?.toLowerCase() ??
    'mock';

  return providers[providerKey] ?? mockDataProvider;
};

export const crmDataProvider = resolveProvider();
