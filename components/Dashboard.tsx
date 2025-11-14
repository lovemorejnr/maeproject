import React, { useMemo } from 'react';
import type { Dealership, DashboardData } from '../types';
import { CarIcon } from './icons/CarIcon';
import { UsersIcon } from './icons/UsersIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ExclamationIcon } from './icons/ExclamationIcon';
import { CogIcon } from './icons/CogIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { ClockIcon } from './icons/ClockIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

interface DashboardProps {
  dealership: Dealership;
  dashboardData: DashboardData;
}

const formatMillions = (value: number) => `NGN ${(value / 1_000_000).toFixed(1)}M`;

const StatCard = ({
  title,
  value,
  icon,
  change,
  currency = false,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  currency?: boolean;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-5">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">
          {currency ? formatMillions(Number(value)) : value}
        </p>
      </div>
      <div className="p-2 bg-gray-100 rounded-lg">
        {icon}
      </div>
    </div>
    {typeof change === 'number' && (
      <p className={`mt-2 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
        <span className="font-semibold">
          {`${change > 0 ? '+' : '-'}${Math.abs(change)}%`}
        </span>
        <span className="ml-1 text-gray-500">vs last month</span>
      </p>
    )}
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ dealership, dashboardData }) => {
  const stats = useMemo(() => {
    return {
      totalRevenue: dashboardData.totalRevenue,
      systemUsers: dashboardData.systemUsers,
      vehicleInventory: dealership.vehicles.length,
      systemHealth: dashboardData.systemHealth,
    };
  }, [dealership.vehicles, dashboardData]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Administration</h1>
          <p className="text-sm text-gray-500">Complete system overview and management controls</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
            <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" /> System Healthy
          </button>
          <button className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
            <DocumentTextIcon className="h-4 w-4 mr-2" /> System Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={stats.totalRevenue} icon={<DollarSignIcon className="h-6 w-6 text-green-500"/>} change={18.5} currency />
        <StatCard title="System Users" value={stats.systemUsers} icon={<UsersIcon className="h-6 w-6 text-blue-500"/>} />
        <StatCard title="Vehicle Inventory" value={stats.vehicleInventory} icon={<CarIcon className="h-6 w-6 text-purple-500"/>} />
        <StatCard title="System Health" value={`${stats.systemHealth}%`} icon={<CheckCircleIcon className="h-6 w-6 text-teal-500"/>} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <SparklesIcon className="h-6 w-6 text-purple-600 mr-3"/>
          <h2 className="text-lg font-semibold text-gray-800">JuneAI Admin Insights</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">AI-powered system administration and optimization recommendations</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Revenue Optimization</h3>
                <p className="text-sm text-green-700 mt-1">System performance is driving 18.5% revenue growth</p>
                <a href="#" className="text-sm font-semibold text-green-800 hover:underline mt-2 inline-block">View Forecast &rarr;</a>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">System Efficiency</h3>
                <p className="text-sm text-blue-700 mt-1">98.7% uptime achieved - implement auto-scaling for peak hours</p>
                <a href="#" className="text-sm font-semibold text-blue-800 hover:underline mt-2 inline-block">Configure Auto-Scale &rarr;</a>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800">Security Alert</h3>
                <p className="text-sm text-yellow-700 mt-1">12 pending approvals detected - batch process available</p>
                <a href="#" className="text-sm font-semibold text-yellow-800 hover:underline mt-2 inline-block">Review Batch &rarr;</a>
            </div>
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* System Alerts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
           <div className="flex items-center mb-4">
              <ExclamationIcon className="h-5 w-5 text-gray-500 mr-2"/>
              <h3 className="font-semibold text-gray-800">System Alerts</h3>
            </div>
            <div className="space-y-4">
              {dashboardData.alerts.map((alert, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <CogIcon className="h-5 w-5 text-gray-500 mr-2"/>
              <h3 className="font-semibold text-gray-800">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center bg-blue-600 text-white p-3 rounded-lg font-semibold text-sm hover:bg-blue-700"><UsersIcon className="h-5 w-5 mr-3"/>User Management</button>
              <button className="w-full flex items-center bg-purple-600 text-white p-3 rounded-lg font-semibold text-sm hover:bg-purple-700"><CogIcon className="h-5 w-5 mr-3"/>System Settings</button>
              <button className="w-full flex items-center bg-green-600 text-white p-3 rounded-lg font-semibold text-sm hover:bg-green-700"><DatabaseIcon className="h-5 w-5 mr-3"/>Database Backup</button>
              <button className="w-full flex items-center bg-orange-500 text-white p-3 rounded-lg font-semibold text-sm hover:bg-orange-600"><ChartBarIcon className="h-5 w-5 mr-3"/>Analytics</button>
            </div>
        </div>

        {/* Recent Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <ClockIcon className="h-5 w-5 text-gray-500 mr-2"/>
              <h3 className="font-semibold text-gray-800">Recent Actions</h3>
            </div>
            <div className="space-y-4">
              {dashboardData.recentActions.map((action, i) => (
                <div key={i} className="flex">
                  <div className="mr-3 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <UsersIcon className="h-5 w-5 text-gray-500"/>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{action.type}</p>
                    <p className="text-xs text-gray-500">{action.role}</p>
                    <p className="text-xs text-gray-400">{action.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
