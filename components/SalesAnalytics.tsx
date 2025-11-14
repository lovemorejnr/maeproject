import React from 'react';
import type { SalesAnalyticsData } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { FilterIcon } from './icons/FilterIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { ClockIcon } from './icons/ClockIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { FunnelIcon } from './icons/FunnelIcon';
import { TrendingDownIcon } from './icons/TrendingDownIcon';
import { EyeIcon } from './icons/EyeIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { CarIcon } from './icons/CarIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface SalesAnalyticsProps {
  onBack: () => void;
  data: SalesAnalyticsData;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const KpiCard: React.FC<{ title: string; value: string; change: number; icon: React.ReactNode; }> = ({ title, value, change, icon }) => (
    <div className="bg-white p-5 rounded-lg border border-gray-200 flex justify-between items-center">
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            <div className={`mt-2 text-sm flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? <TrendingUpIcon className="h-4 w-4 mr-1" /> : <TrendingDownIcon className="h-4 w-4 mr-1" />}
                <span className="font-semibold">{Math.abs(change)}%</span>
                <span className="ml-1 text-gray-500">vs last month</span>
            </div>
        </div>
        <div className="text-gray-400">
            {icon}
        </div>
    </div>
);

const SalesAnalytics: React.FC<SalesAnalyticsProps> = ({ onBack, data }) => {
    const { kpis, salesTrend, vehicleCategories, teamPerformance, salesFunnel } = data;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <div>
                        <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-2">
                           <ArrowLeftIcon className="h-4 w-4 mr-2" />
                           Back to Dashboard
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
                        <p className="text-sm text-gray-500">Comprehensive sales performance and team analytics</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
                            <FilterIcon className="h-4 w-4 mr-2" /> Filter
                        </button>
                        <button className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
                            <RefreshIcon className="h-4 w-4 mr-2" /> Refresh
                        </button>
                        <button className="flex items-center bg-primary-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-primary-700">
                            <DownloadIcon className="h-4 w-4 mr-2" /> Export Report
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <KpiCard title="Total Revenue" value={formatCurrency(kpis.totalRevenue.value)} change={kpis.totalRevenue.change} icon={<DollarSignIcon className="h-8 w-8"/>} />
                    <KpiCard title="Vehicles Sold" value={kpis.vehiclesSold.value.toString()} change={kpis.vehiclesSold.change} icon={<CarIcon className="h-8 w-8"/>} />
                    <KpiCard title="Conversion Rate" value={`${kpis.conversionRate.value}%`} change={kpis.conversionRate.change} icon={<CheckCircleIcon className="h-8 w-8"/>} />
                    <KpiCard title="Avg Deal Size" value={formatCurrency(kpis.avgDealSize.value)} change={kpis.avgDealSize.change} icon={<ChartBarIcon className="h-8 w-8"/>} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                    {/* Sales Trend */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                            <TrendingUpIcon className="h-5 w-5 text-gray-500 mr-2"/>
                            <h2 className="text-lg font-semibold text-gray-800">Sales Trend (6 Months)</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Monthly sales and revenue performance</p>
                        <div className="space-y-4">
                            {salesTrend.map((item, index) => (
                                <div key={item.month} className="flex items-center space-x-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full z-10"></div>
                                        {index < salesTrend.length - 1 && <div className="w-px h-10 bg-gray-200"></div>}
                                    </div>
                                    <div className="flex-1 pb-4">
                                        <p className="font-semibold text-gray-800">{item.month}</p>
                                    </div>
                                    <div className="text-right pb-4">
                                        <p className="font-bold text-gray-900">{item.vehicles} vehicles</p>
                                        <p className="text-sm text-gray-500">{formatCurrency(item.revenue)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vehicle Categories */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                            <ClockIcon className="h-5 w-5 text-gray-500 mr-2"/>
                            <h2 className="text-lg font-semibold text-gray-800">Vehicle Categories</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Sales distribution by vehicle type</p>
                        <div className="space-y-5">
                            {vehicleCategories.map(cat => (
                                <div key={cat.name}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-800">{cat.name}</span>
                                        <span className="text-sm text-gray-500">{cat.vehicles} vehicles ({cat.percentage}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className={`${cat.color} h-2.5 rounded-full`} style={{ width: `${cat.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Performance & Sales Funnel */}
                <div className="grid grid-cols-1 gap-6">
                     {/* Team Performance */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                         <div className="flex items-center mb-4">
                            <UserGroupIcon className="h-5 w-5 text-gray-500 mr-2"/>
                            <h2 className="text-lg font-semibold text-gray-800">Team Performance Analysis</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Individual team member performance metrics</p>
                        <div className="divide-y divide-gray-200">
                           {teamPerformance.map(member => (
                               <div key={member.name} className="py-3 flex flex-wrap items-center justify-between gap-4">
                                   <div className="flex items-center w-full sm:w-auto sm:flex-1">
                                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">{member.initials}</div>
                                       <div className="ml-3">
                                           <p className="font-semibold text-gray-900">{member.name}</p>
                                           <p className="text-xs text-gray-500">{member.role}</p>
                                       </div>
                                   </div>
                                   <div className="text-center">
                                       <p className="font-bold text-gray-900">{member.sales}</p>
                                       <p className="text-xs text-gray-500">sales</p>
                                   </div>
                                   <div className="text-center">
                                       <p className="font-bold text-gray-900">{formatCurrency(member.revenue)}</p>
                                       <p className="text-xs text-gray-500">revenue</p>
                                   </div>
                                   <div className="text-center">
                                       <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                                           member.target >= 100 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                       }`}>{member.target}%</span>
                                       <p className="text-xs text-gray-500 mt-1">target</p>
                                   </div>
                                   <div className="flex items-center space-x-2">
                                       {member.trend === 'up' ? <TrendingUpIcon className="h-5 w-5 text-green-500"/> : <TrendingDownIcon className="h-5 w-5 text-red-500"/>}
                                       <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100"><EyeIcon className="h-5 w-5"/></button>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </div>
                     {/* Sales Funnel */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                         <div className="flex items-center mb-4">
                            <FunnelIcon className="h-5 w-5 text-gray-500 mr-2"/>
                            <h2 className="text-lg font-semibold text-gray-800">Sales Funnel Analysis</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Lead conversion through sales stages</p>
                        <div className="space-y-4">
                            {salesFunnel.map(stage => (
                                <div key={stage.stage}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-800">{stage.stage}</span>
                                        <span className="text-sm text-gray-500">{stage.value} ({stage.percentage}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-green-400 h-3 rounded-full" 
                                            style={{ width: `${stage.percentage}%` }}>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesAnalytics;
