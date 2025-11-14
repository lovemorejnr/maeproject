import {
  MOCK_DEALERSHIPS,
  DASHBOARD_DATA,
  CUSTOMER_DASHBOARD_DATA,
  MOCK_CUSTOMERS,
} from '../data/mockData';
import { SALES_ANALYTICS_DATA } from '../data/analyticsData';
import { DOCUMENT_VAULT_DATA } from '../data/documentData';
import { REPORTS_DATA } from '../data/reportsData';
import type {
  Dealership,
  Customer,
  DashboardData,
  CustomerDashboardData,
  SalesAnalyticsData,
  DocumentVaultData,
  ReportsData,
} from '../types';
import type { CRMDataProvider } from './dataProvider';

const clone = <T>(value: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

export const mockDataProvider: CRMDataProvider = {
  async getDealerships(): Promise<Dealership[]> {
    return clone(MOCK_DEALERSHIPS);
  },

  async getCustomers(): Promise<Customer[]> {
    return clone(MOCK_CUSTOMERS);
  },

  async getDashboardOverview(): Promise<DashboardData> {
    return clone(DASHBOARD_DATA);
  },

  async getCustomerDashboardOverview(): Promise<CustomerDashboardData> {
    return clone(CUSTOMER_DASHBOARD_DATA);
  },

  async getSalesAnalytics(): Promise<SalesAnalyticsData> {
    return clone(SALES_ANALYTICS_DATA);
  },

  async getDocumentVault(): Promise<DocumentVaultData> {
    return clone(DOCUMENT_VAULT_DATA);
  },

  async getReports(): Promise<ReportsData> {
    return clone(REPORTS_DATA);
  },
};
