import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type {
  Dealership,
  Vehicle,
  Customer,
  Notification,
  DashboardData,
  CustomerDashboardData,
  SalesAnalyticsData,
  DocumentVaultData,
  ReportsData,
} from './types';
import { crmDataProvider } from './services/dataProvider';
import { submitCustomerForm, submitVehicleForm } from './services/formSubmissionService';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import VehicleInventory from './components/VehicleInventory';
import CustomerManagement from './components/CustomerManagement';
import ListCarForSale from './components/ListCarForSale';
import SearchResults from './components/SearchResults';
import SalesAnalytics from './components/SalesAnalytics';
import DocumentVault from './components/DocumentVault';
import Reports from './components/Reports';

const App: React.FC = () => {
  const [dealerships, setDealerships] = useState<Dealership[]>([]);
  const [activeDealershipId, setActiveDealershipId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('reports');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [customerDashboardData, setCustomerDashboardData] = useState<CustomerDashboardData | null>(null);
  const [salesAnalyticsData, setSalesAnalyticsData] = useState<SalesAnalyticsData | null>(null);
  const [documentVaultData, setDocumentVaultData] = useState<DocumentVaultData | null>(null);
  const [reportsData, setReportsData] = useState<ReportsData | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        const [
          dealershipData,
          customerData,
          dashboardOverview,
          customerOverview,
          analytics,
          documentVault,
          reports,
        ] = await Promise.all([
          crmDataProvider.getDealerships(),
          crmDataProvider.getCustomers(),
          crmDataProvider.getDashboardOverview(),
          crmDataProvider.getCustomerDashboardOverview(),
          crmDataProvider.getSalesAnalytics(),
          crmDataProvider.getDocumentVault(),
          crmDataProvider.getReports(),
        ]);

        if (!isMounted) return;

        setDealerships(dealershipData);
        setCustomers(customerData);
        setDashboardData(dashboardOverview);
        setCustomerDashboardData(customerOverview);
        setSalesAnalyticsData(analytics);
        setDocumentVaultData(documentVault);
        setReportsData(reports);

        setActiveDealershipId((prev) => prev ?? dealershipData[0]?.id ?? null);
      } catch (error) {
        console.error('Failed to load CRM data', error);
        if (isMounted) {
          setBootstrapError('Unable to load CRM data. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeDealership = useMemo(
    () => dealerships.find((d) => d.id === activeDealershipId),
    [dealerships, activeDealershipId]
  );
  
  const allVehicles = useMemo(() => 
    dealerships.flatMap(dealer => dealer.vehicles), 
    [dealerships]
  );
  
  const handleSaveVehicle = useCallback(
    async (vehicleData: Omit<Vehicle, 'id'>) => {
      if (!activeDealershipId) {
        throw new Error('Select a dealership before adding vehicles.');
      }

      try {
        await submitVehicleForm(
          {
            ...vehicleData,
            dealershipId: activeDealershipId,
            dealershipName: activeDealership?.name,
          },
          'VEHICLE_LISTING'
        );
      } catch (error) {
        console.error('Failed to persist vehicle listing submission', error);
        throw error;
      }

      const newVehicle: Vehicle = {
        ...vehicleData,
        id: `v${Date.now()}`,
        status: 'Available',
        imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
        vin: `VIN${Date.now()}`.slice(0, 17).toUpperCase(),
      };

      setDealerships((prevDealerships) =>
        prevDealerships.map((dealer) => {
          if (dealer.id === activeDealershipId) {
            const updatedVehicles = [...dealer.vehicles, newVehicle];
            return { ...dealer, vehicles: updatedVehicles };
          }
          return dealer;
        })
      );

      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        title: 'New Vehicle Listed',
        message: `A ${newVehicle.make} ${newVehicle.model} was added to ${activeDealership?.name}.`,
        timestamp: new Date(),
        read: false,
        type: 'vehicle',
      };
      setNotifications((prev) => [newNotification, ...prev]);

      setActiveView('inventory');
    },
    [activeDealership, activeDealershipId]
  );

  const handleUpdateVehicle = useCallback(
    async (updatedVehicle: Vehicle) => {
      if (!activeDealershipId) {
        throw new Error('Select a dealership before updating vehicles.');
      }

      try {
        await submitVehicleForm(
          {
            ...updatedVehicle,
            dealershipId: activeDealershipId,
            updatedFromInventory: true,
          },
          'VEHICLE_UPDATE'
        );
      } catch (error) {
        console.error('Failed to persist vehicle update submission', error);
        throw error;
      }

      setDealerships((prevDealerships) =>
        prevDealerships.map((dealer) => {
          if (dealer.id === activeDealershipId) {
            return {
              ...dealer,
              vehicles: dealer.vehicles.map((v) =>
                v.id === updatedVehicle.id ? updatedVehicle : v
              ),
            };
          }
          return dealer;
        })
      );
    },
    [activeDealershipId]
  );

  const handleDeleteVehicle = useCallback((vehicleId: string) => {
    if (!activeDealershipId) return;

    if (window.confirm('Are you sure you want to delete this vehicle?')) {
        setDealerships((prevDealerships) =>
            prevDealerships.map((dealer) => {
                if (dealer.id === activeDealershipId) {
                    const updatedVehicles = dealer.vehicles.filter(
                        (v) => v.id !== vehicleId
                    );
                    return { ...dealer, vehicles: updatedVehicles };
                }
                return dealer;
            })
        );
    }
  }, [activeDealershipId]);

  const handleAddCustomer = useCallback(
    async (
      customerData: Omit<
        Customer,
        'id' | 'initials' | 'totalSpent' | 'purchases' | 'enquiries' | 'lastContact'
      >
    ) => {
      try {
        await submitCustomerForm(customerData);
      } catch (error) {
        console.error('Failed to persist customer form submission', error);
        throw error;
      }

      const nameParts = customerData.name.trim().split(' ');
      const initials = (
        `${nameParts[0]?.[0] || ''}${
          nameParts.length > 1 ? nameParts[nameParts.length - 1]?.[0] || '' : ''
        }`
      ).toUpperCase();

      const newCustomer: Customer = {
        ...customerData,
        id: `c${Date.now()}`,
        initials,
        totalSpent: 0,
        purchases: 0,
        enquiries: 1,
        lastContact: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
      setCustomers((prevCustomers) => [newCustomer, ...prevCustomers]);

      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        title: 'New Customer Added',
        message: `${newCustomer.name} from ${newCustomer.company} is now a customer.`,
        timestamp: new Date(),
        read: false,
        type: 'customer',
      };
      setNotifications((prev) => [newNotification, ...prev]);
    },
    []
  );

  const handleMarkNotificationsRead = useCallback(() => {
    setNotifications(prevNotifications => 
        prevNotifications.map(n => n.read ? n : { ...n, read: true })
    );
  }, []);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setActiveView('searchResults');
    }
  };

  const renderContent = () => {
    if (activeView === 'listCar') {
      return (
        <ListCarForSale
          onPublish={handleSaveVehicle}
          onCancel={() => setActiveView('dashboard')}
        />
      );
    }

    if (activeView === 'searchResults') {
      return <SearchResults query={searchQuery} vehicles={allVehicles} customers={customers} />;
    }
    
    switch (activeView) {
      case 'dashboard':
        if (!activeDealership || !dashboardData) {
          return (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">Loading dashboard data...</p>
            </div>
          );
        }
        return <Dashboard dealership={activeDealership} dashboardData={dashboardData} />;
      case 'analytics':
        if (!salesAnalyticsData) {
          return (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">Loading analytics...</p>
            </div>
          );
        }
        return <SalesAnalytics onBack={() => setActiveView('dashboard')} data={salesAnalyticsData} />;
      case 'inventory':
        if (!activeDealership) {
          return (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">Loading inventory...</p>
            </div>
          );
        }
        return (
          <VehicleInventory 
            dealership={activeDealership}
            onDeleteVehicle={handleDeleteVehicle}
            onUpdateVehicle={handleUpdateVehicle}
          />
        );
      case 'customers':
        if (!customerDashboardData) {
          return (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">Loading customers...</p>
            </div>
          );
        }
        return (
          <CustomerManagement
            customers={customers}
            onAddCustomer={handleAddCustomer}
            overview={customerDashboardData}
          />
        );
      case 'documentVault':
        if (!documentVaultData) {
          return (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">Loading documents...</p>
            </div>
          );
        }
        return <DocumentVault data={documentVaultData} />;
      case 'reports':
        if (!reportsData) {
          return (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">Loading reports...</p>
            </div>
          );
        }
        return <Reports data={reportsData} />;
      default:
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Coming Soon</h1>
            <p className="text-gray-600">This feature is not yet implemented.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-gray-800 font-sans">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onAddVehicle={() => setActiveView('listCar')}
          notifications={notifications}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {isBootstrapping ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">Initializing CRM data...</p>
            </div>
          ) : bootstrapError ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-red-500">{bootstrapError}</p>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
