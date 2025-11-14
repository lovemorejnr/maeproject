import type { SalesAnalyticsData } from '../types';

export const SALES_ANALYTICS_DATA: SalesAnalyticsData = {
  kpis: {
    totalRevenue: { value: 159600000, change: 18.5 },
    vehiclesSold: { value: 41, change: 12 },
    conversionRate: { value: 22.4, change: 3.2 },
    avgDealSize: { value: 3892683, change: 5.1 },
  },
  salesTrend: [
    { month: 'Jan', vehicles: 28, revenue: 125000000 },
    { month: 'Feb', vehicles: 35, revenue: 158000000 },
    { month: 'Mar', vehicles: 41, revenue: 189000000 },
    { month: 'Apr', vehicles: 38, revenue: 172000000 },
    { month: 'May', vehicles: 45, revenue: 203000000 },
    { month: 'Jun', vehicles: 52, revenue: 235000000 },
  ],
  vehicleCategories: [
    { name: 'Sedans', vehicles: 18, percentage: 44, color: 'bg-blue-500' },
    { name: 'SUVs', vehicles: 15, percentage: 37, color: 'bg-green-500' },
    { name: 'Hatchbacks', vehicles: 6, percentage: 15, color: 'bg-purple-500' },
    { name: 'Trucks', vehicles: 2, percentage: 5, color: 'bg-orange-500' },
  ],
  teamPerformance: [
    { initials: 'SW', name: 'Sarah Wilson', role: 'Sales Executive', sales: 12, revenue: 45200000, target: 120, trend: 'up' },
    { initials: 'DC', name: 'David Chen', role: 'Sales Executive', sales: 10, revenue: 38900000, target: 111, trend: 'up' },
    { initials: 'MT', name: 'Mike Thompson', role: 'Sales Executive', sales: 8, revenue: 31500000, target: 100, trend: 'up' },
    { initials: 'ED', name: 'Emma Davis', role: 'Sales Executive', sales: 6, revenue: 24800000, target: 75, trend: 'down' },
    { initials: 'JS', name: 'John Smith', role: 'Sales Executive', sales: 5, revenue: 19200000, target: 83, trend: 'down' },
  ],
  salesFunnel: [
    { stage: 'Leads Generated', value: 156, percentage: 100 },
    { stage: 'Qualified Leads', value: 89, percentage: 57 },
    { stage: 'Test Drives', value: 45, percentage: 29 },
    { stage: 'Proposals Sent', value: 32, percentage: 21 },
    { stage: 'Deals Closed', value: 18, percentage: 12 },
  ],
};
