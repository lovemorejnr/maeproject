import type {
  Dealership,
  Customer,
  DashboardData,
  CustomerDashboardData,
} from '../types';

export const MOCK_DEALERSHIPS: Dealership[] = [
  {
    id: 'dealer-1',
    name: 'Prestige Motors',
    location: 'Beverly Hills, CA',
    vehicles: [
      { id: 'v1', make: 'Mercedes-Benz', model: 'S-Class', year: 2023, price: 120000, mileage: 5000, status: 'Available', imageUrl: 'https://picsum.photos/seed/v1/400/300', vin: 'WDD2231871A123456' },
      { id: 'v2', make: 'BMW', model: '7 Series', year: 2022, price: 95000, mileage: 12000, status: 'Available', imageUrl: 'https://picsum.photos/seed/v2/400/300', vin: 'WBA7G0C0XNC654321' },
      { id: 'v3', make: 'Audi', model: 'A8', year: 2023, price: 105000, mileage: 7500, status: 'Sold', imageUrl: 'https://picsum.photos/seed/v3/400/300', vin: 'WAUZZZ4NXP098765' },
      { id: 'v4', make: 'Porsche', model: '911 Carrera', year: 2024, price: 150000, mileage: 1200, status: 'Pending', imageUrl: 'https://picsum.photos/seed/v4/400/300', vin: 'WP0AB2A97RS123456' },
      { id: 'v5', make: 'Tesla', model: 'Model X', year: 2023, price: 85000, mileage: 9000, status: 'Available', imageUrl: 'https://picsum.photos/seed/v5a/400/300', vin: '5YJ3E1EB5PF789013' },
      { id: 'v6', make: 'Ford', model: 'Bronco', year: 2023, price: 65000, mileage: 3000, status: 'Available', imageUrl: 'https://picsum.photos/seed/v6a/400/300', vin: '1FMCU0E51PUD34568' },
    ]
  },
  {
    id: 'dealer-2',
    name: 'Urban Drive',
    location: 'Brooklyn, NY',
    vehicles: [
      { id: 'v7', make: 'Tesla', model: 'Model 3', year: 2023, price: 45000, mileage: 8000, status: 'Sold', imageUrl: 'https://picsum.photos/seed/v7a/400/300', vin: '5YJ3E1EA5PF789012' },
      { id: 'v8', make: 'Ford', model: 'Mustang Mach-E', year: 2023, price: 55000, mileage: 6000, status: 'Available', imageUrl: 'https://picsum.photos/seed/v8a/400/300', vin: '1FMCU0E51PUD34567' },
      { id: 'v9', make: 'Rivian', model: 'R1T', year: 2022, price: 75000, mileage: 15000, status: 'Available', imageUrl: 'https://picsum.photos/seed/v9a/400/300', vin: '7FCTGAEE2NEX89012' },
    ]
  },
  {
    id: 'dealer-3',
    name: 'Sunset Imports',
    location: 'Miami, FL',
    vehicles: [
      { id: 'v10', make: 'Ferrari', model: 'SF90 Stradale', year: 2023, price: 625000, mileage: 900, status: 'Available', imageUrl: 'https://picsum.photos/seed/v10/400/300', vin: 'ZFF89ASB000234567' },
      { id: 'v11', make: 'Lamborghini', model: 'Huracan Evo', year: 2022, price: 280000, mileage: 3000, status: 'Pending', imageUrl: 'https://picsum.photos/seed/v11/400/300', vin: 'ZHWTB1ZE6NLB45678' },
    ]
  },
];


export const DASHBOARD_DATA: DashboardData = {
  totalRevenue: 245600000,
  systemUsers: 42,
  systemHealth: 98.7,
  alerts: [
    { level: 'Medium', type: 'Security', count: 3, description: 'New user registration requires approval', date: 'Jan 15, 2024' },
    { level: 'Info', type: 'System', description: 'Database backup completed successfully', date: 'Jan 15, 2024' },
    { level: 'High', type: 'Performance', description: 'High traffic detected - scaling recommended', date: 'Jan 15, 2024' },
  ],
  quickActions: {
    pendingApprovals: 12,
  },
  recentActions: [
    { type: 'User Created', user: 'David Chen', role: 'New Manager account', timestamp: 'Admin - Jan 15, 2024' },
    { type: 'System Backup', user: 'System', role: 'Automated daily backup completed', timestamp: 'System - Jan 15, 2024' },
    { type: 'Permission Updated', user: 'Admin', role: 'Sales team access modified', timestamp: 'Admin - Jan 14, 2024' },
    { type: 'Report Generated', user: 'Sarah Wilson', role: 'Monthly sales analytics exported', timestamp: 'Admin - Jan 14, 2024' },
  ],
  departmentPerformance: [
    { name: 'Sales', target: 50, achieved: 47, budget: 156800000, change: 12.5 },
    { name: 'Service', target: 25, achieved: 28, budget: 45200000, change: 18.2 },
    { name: 'Marketing', target: 15, achieved: 14, budget: 23400000, change: -3.1 },
    { name: 'Operations', target: 100, achieved: 94, budget: 20200000, change: 8.7 },
  ]
};


export const CUSTOMER_DASHBOARD_DATA: CustomerDashboardData = {
  totalCustomers: 5,
  activeCustomers: 2,
  vipCustomers: 1,
  activeLeads: 2,
  totalRevenue: 122100000,
};

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', initials: 'AJ', name: 'Adebayo Johnson', company: 'Tech Solutions Ltd', email: 'adebayo.johnson@gmail.com', phone: '+234 801 234 5678', location: 'Lagos, Lagos State', type: 'Individual', status: 'Active', totalSpent: 15200000, purchases: 1, enquiries: 3, lastContact: 'Jan 15, 2024' },
  { id: 'c2', initials: 'FA', name: 'Fatima Abubakar', company: 'National Hospital Abuja', email: 'fatima.abubakar@yahoo.com', phone: '+234 802 345 6789', location: 'Abuja, FCT', type: 'Individual', status: 'Lead', totalSpent: 0, purchases: 0, enquiries: 2, lastContact: 'Jan 14, 2024' },
  { id: 'c3', initials: 'CO', name: 'Chukwuma Okafor', company: 'Shell Nigeria', email: 'chukwuma.okafor@hotmail.com', phone: '+234 803 456 7890', location: 'Port Harcourt, Rivers State', type: 'Individual', status: 'VIP', totalSpent: 78000000, purchases: 2, enquiries: 1, lastContact: 'Jan 13, 2024' },
  { id: 'c4', initials: 'KA', name: 'Kemi Adebola', company: 'K&A Fashion House', email: 'kemi.adebola@gmail.com', phone: '+234 804 567 8901', location: 'Lagos, Lagos State', type: 'Business', status: 'Prospect', totalSpent: 0, purchases: 0, enquiries: 1, lastContact: 'Jan 12, 2024' },
  { id: 'c5', initials: 'TB', name: 'Tunde Bakare', company: 'Ministry of Agriculture', email: 'tunde.bakare@outlook.com', phone: '+234 805 678 9012', location: 'Kano, Kano State', type: 'Government', status: 'Active', totalSpent: 28900000, purchases: 1, enquiries: 2, lastContact: 'Jan 11, 2024' },
];
