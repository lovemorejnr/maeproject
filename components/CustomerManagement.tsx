import React, { useState, useMemo } from 'react';
import type { Customer, CustomerStatus, CustomerType, CustomerDashboardData } from '../types';

import { UsersIcon } from './icons/UsersIcon';
import { StarIcon } from './icons/StarIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { SearchIcon } from './icons/SearchIcon';
import { FilterIcon } from './icons/FilterIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { PlusIcon } from './icons/PlusIcon';
import { OfficeBuildingIcon } from './icons/OfficeBuildingIcon';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { CarIcon } from './icons/CarIcon';
import { DotsVerticalIcon } from './icons/DotsVerticalIcon';
import { ExclamationIcon } from './icons/ExclamationIcon';
import CustomerModal from './CustomerModal';

interface CustomerManagementProps {
    customers: Customer[];
    onAddCustomer: (customerData: Omit<Customer, 'id' | 'initials' | 'totalSpent' | 'purchases' | 'enquiries' | 'lastContact'>) => Promise<void> | void;
    overview: CustomerDashboardData;
}

const StatCard = ({ title, value, subtext, icon, iconBgColor }: { title: string, value: string | number, subtext: string, icon: React.ReactNode, iconBgColor: string }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-5">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500">{subtext}</p>
      </div>
      <div className={`p-2 rounded-lg ${iconBgColor}`}>
        {icon}
      </div>
    </div>
  </div>
);

const statusColors: Record<CustomerStatus, string> = {
  Active: 'bg-green-100 text-green-800',
  Lead: 'bg-blue-100 text-blue-800',
  VIP: 'bg-purple-100 text-purple-800',
  Prospect: 'bg-orange-100 text-orange-800',
};

const typeColors: Record<CustomerType, string> = {
  Individual: 'bg-blue-100 text-blue-800',
  Business: 'bg-green-100 text-green-800',
  Government: 'bg-purple-100 text-purple-800',
};


const CustomerManagement: React.FC<CustomerManagementProps> = ({ customers, onAddCustomer, overview }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    }

    const handleSaveCustomer = async (customerData: Omit<Customer, 'id' | 'initials' | 'totalSpent' | 'purchases' | 'enquiries' | 'lastContact'>) => {
        try {
            await onAddCustomer(customerData);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Unable to add customer', error);
            throw error;
        }
    };

    return (
        <>
            <div className="p-4 sm:p-6 lg:p-8 bg-slate-50">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                        <p className="text-sm text-gray-500">Manage customer relationships and track sales performance</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
                            <DownloadIcon className="h-4 w-4 mr-2" /> Export
                        </button>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="flex items-center bg-primary-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-primary-700">
                            <PlusIcon className="h-4 w-4 mr-2" /> Add Customer
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Customers" value={overview.totalCustomers} subtext={`${overview.activeCustomers} active`} icon={<UsersIcon className="h-6 w-6 text-gray-500"/>} iconBgColor="bg-gray-100" />
                    <StatCard title="VIP Customers" value={overview.vipCustomers} subtext="High-value clients" icon={<StarIcon className="h-6 w-6 text-purple-500"/>} iconBgColor="bg-purple-100" />
                    <StatCard title="Active Leads" value={overview.activeLeads} subtext="Potential customers" icon={<TrendingUpIcon className="h-6 w-6 text-blue-500"/>} iconBgColor="bg-blue-100" />
                    <StatCard title="Total Revenue" value={formatCurrency(overview.totalRevenue)} subtext="From all customers" icon={<DollarSignIcon className="h-6 w-6 text-green-500"/>} iconBgColor="bg-green-100" />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50">
                <div className="flex items-center mb-4">
                    <SparklesIcon className="h-6 w-6 text-purple-600 mr-3"/>
                    <h2 className="text-lg font-semibold text-gray-800">JuneAI Customer Insights</h2>
                </div>
                <p className="text-sm text-gray-500 mb-6">AI-powered customer analysis and engagement recommendations</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-green-800">High Intent Customers</h3>
                        <p className="text-sm text-green-700 mt-1">5 customers showing strong purchase signals in last 7 days</p>
                        <a href="#" className="text-sm font-semibold text-primary-600 hover:underline mt-2 inline-block">Contact Now &rarr;</a>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-blue-800">Smart Matching</h3>
                        <p className="text-sm text-blue-700 mt-1">12 customers match current inventory preferences</p>
                        <a href="#" className="text-sm font-semibold text-primary-600 hover:underline mt-2 inline-block">Send Offers &rarr;</a>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-yellow-200">
                        <h3 className="font-semibold text-yellow-800 flex items-center"><ExclamationIcon className="h-4 w-4 mr-1.5"/> Re-engagement Needed</h3>
                        <p className="text-sm text-yellow-700 mt-1">8 VIP customers haven't been contacted in 30+ days</p>
                        <a href="#" className="text-sm font-semibold text-primary-600 hover:underline mt-2 inline-block">Schedule Follow-up &rarr;</a>
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 flex justify-between items-center border-b border-gray-200">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Customer Database</h2>
                            <p className="text-sm text-gray-500">Manage and track all customer relationships</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input type="text" placeholder="Search customers..." className="pl-9 pr-3 py-2 text-sm border border-gray-400 rounded-lg w-48 bg-white"/>
                            </div>
                            <select className="text-sm border border-gray-400 rounded-lg py-2 px-3 bg-white">
                                <option>All Status</option>
                            </select>
                            <select className="text-sm border border-gray-400 rounded-lg py-2 px-3 bg-white">
                                <option>All Types</option>
                            </select>
                            <select className="text-sm border border-gray-400 rounded-lg py-2 px-3 bg-white">
                                <option>All Sources</option>
                            </select>
                            <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                <FilterIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="py-3 px-4 text-left">Customer</th>
                                    <th className="py-3 px-4 text-left">Contact</th>
                                    <th className="py-3 px-4 text-left">Type</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Total Spent</th>
                                    <th className="py-3 px-4 text-left">Purchases</th>
                                    <th className="py-3 px-4 text-left">Last Contact</th>
                                    <th className="py-3 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {customers.length > 0 ? (
                                    customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                                                    {customer.initials}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="font-semibold text-gray-900">{customer.name}</p>
                                                    <p className="text-xs text-gray-500 flex items-center"><OfficeBuildingIcon className="h-3 w-3 mr-1"/>{customer.company}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-gray-800 flex items-center"><MailIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400"/> {customer.email}</p>
                                                <p className="text-gray-800 flex items-center"><PhoneIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400"/> {customer.phone}</p>
                                                <p className="text-gray-500 text-xs flex items-center"><LocationMarkerIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400"/> {customer.location}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[customer.type]}`}>
                                                {customer.type}
                                            </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[customer.status]}`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap font-medium text-gray-800">{formatCurrency(customer.totalSpent)}</td>
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="flex items-center text-gray-600">
                                                <CarIcon className="h-4 w-4 mr-2" />
                                                <span>{customer.purchases}</span>
                                                <span className="mx-2 text-gray-300">|</span>
                                                <span>{customer.enquiries} enquiries</span>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-gray-600">{customer.lastContact}</td>
                                        <td className="p-4 whitespace-nowrap">
                                            <button className="text-gray-500 hover:text-gray-800">
                                                <DotsVerticalIcon className="h-5 w-5"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="text-center py-16 px-4">
                                            <div className="mx-auto text-center">
                                                <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
                                                <p className="mt-1 text-sm text-gray-500">Get started by adding a new customer.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <CustomerModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddCustomer={handleSaveCustomer}
            />
        </>
    );
};

export default CustomerManagement;
