import React from 'react';
import type { ReportsData, ReportQuickActionIcon } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { PlusIcon } from './icons/PlusIcon';
import { DocumentDuplicateIcon } from './icons/DocumentDuplicateIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { ClockIcon } from './icons/ClockIcon';
import { FolderOpenIcon } from './icons/FolderOpenIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ChartPieIcon } from './icons/ChartPieIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { CarIcon } from './icons/CarIcon';
import { UsersIcon } from './icons/UsersIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { EyeIcon } from './icons/EyeIcon';
import { ShareIcon } from './icons/ShareIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

const KpiCard: React.FC<{ title: string; value: string; subtext: string; icon: React.ReactNode }> = ({ title, value, subtext, icon }) => (
    <div className="bg-white p-5 rounded-lg border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                <p className="text-xs text-gray-500">{subtext}</p>
            </div>
            <div className="p-2 text-gray-400">
                {icon}
            </div>
        </div>
    </div>
);

interface ReportsProps {
    data: ReportsData;
}

const Reports: React.FC<ReportsProps> = ({ data }) => {
    const { kpis, insights, availableReports, recentReports, quickActions } = data;

    const categoryIcons: { [key: string]: React.FC<any> } = {
        "Sales Reports": DollarSignIcon,
        "Inventory Reports": CarIcon,
        "Customer Reports": UsersIcon,
        "Financial Reports": ChartBarIcon,
    };

    const quickActionIcons: Record<ReportQuickActionIcon, React.FC<any>> = {
        trendingUp: TrendingUpIcon,
        car: CarIcon,
        users: UsersIcon,
        chartBar: ChartBarIcon,
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                        <p className="text-sm text-gray-500">Generate and download comprehensive business reports</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
                            Last 30 days <ChevronDownIcon className="h-4 w-4 ml-2" />
                        </button>
                        <button className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
                            <ScaleIcon className="h-4 w-4 mr-2" /> Compare
                        </button>
                        <button className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
                            <CalendarIcon className="h-4 w-4 mr-2" /> Schedule Report
                        </button>
                        <button className="flex items-center bg-primary-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-primary-700">
                            <PlusIcon className="h-4 w-4 mr-2" /> Create Report
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KpiCard title="Reports Generated" value={kpis.generated.toString()} subtext="This month" icon={<DocumentDuplicateIcon className="h-7 w-7" />} />
                    <KpiCard title="Downloads" value={kpis.downloads.toLocaleString()} subtext="Total downloads" icon={<DownloadIcon className="h-7 w-7" />} />
                    <KpiCard title="Scheduled Reports" value={kpis.scheduled.toString()} subtext="Auto-generated" icon={<ClockIcon className="h-7 w-7" />} />
                    <KpiCard title="Storage Used" value={`${kpis.storageUsed} GB`} subtext={`Of ${kpis.storageLimit} GB limit`} icon={<FolderOpenIcon className="h-7 w-7" />} />
                </div>

                {/* JuneAI Insights */}
                <div className="bg-purple-50/50 rounded-lg border border-purple-200/80 p-6 mb-8">
                    <div className="flex items-center mb-4">
                        <SparklesIcon className="h-6 w-6 text-purple-600 mr-3" />
                        <h2 className="text-lg font-semibold text-gray-800">JuneAI Reports Insights</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">AI-powered reporting optimization and data insights</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 flex items-start space-x-4">
                            <div className="bg-green-100 p-2 rounded-lg"><ChartPieIcon className="h-6 w-6 text-green-600" /></div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{insights.autoGenerated.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{insights.autoGenerated.description}</p>
                                <a href="#" className="text-sm font-semibold text-primary-600 hover:underline mt-2 inline-block">View Reports &rarr;</a>
                            </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 flex items-start space-x-4">
                             <div className="bg-blue-100 p-2 rounded-lg"><LightBulbIcon className="h-6 w-6 text-blue-600" /></div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{insights.smartScheduling.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{insights.smartScheduling.description}</p>
                                <a href="#" className="text-sm font-semibold text-primary-600 hover:underline mt-2 inline-block">Setup Automation &rarr;</a>
                            </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 flex items-start space-x-4">
                            <div className="bg-yellow-100 p-2 rounded-lg"><ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" /></div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{insights.storageOptimization.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{insights.storageOptimization.description}</p>
                                <a href="#" className="text-sm font-semibold text-primary-600 hover:underline mt-2 inline-block">Clean Storage &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Available Reports */}
                    <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
                        <div className="p-4 flex justify-between items-center border-b">
                             <h2 className="text-lg font-semibold text-gray-800">Available Reports</h2>
                             <button className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-1.5">All Categories <ChevronDownIcon className="h-4 w-4 ml-2" /></button>
                        </div>
                        <div className="p-4 space-y-6">
                            {Object.entries(availableReports).map(([category, reports]) => {
                                const Icon = categoryIcons[category];
                                return (
                                    <div key={category}>
                                        <div className="flex items-center mb-3">
                                            <Icon className="h-5 w-5 text-gray-500 mr-2" />
                                            <h3 className="font-semibold text-gray-700">{category}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {reports.map(report => (
                                                <div key={report.name} className="bg-white rounded-lg border border-gray-200 p-4">
                                                    <div className="flex justify-between items-start">
                                                        <p className="font-semibold text-gray-800">{report.name}</p>
                                                        <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">{report.frequency}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                                                <p className="text-xs text-gray-400 mt-3">{`Last: ${report.lastRun} - ${report.format} - ${report.size}`}</p>
                                                    <div className="mt-3 flex space-x-2">
                                                        <button className="flex items-center text-sm bg-white border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50"><EyeIcon className="h-4 w-4 mr-1.5"/>View</button>
                                                        <button className="flex items-center text-sm bg-white border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50"><DownloadIcon className="h-4 w-4 mr-1.5"/>Download</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Reports */}
                    <div className="bg-white rounded-lg border border-gray-200 h-fit">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
                            <p className="text-sm text-gray-500">Recently generated reports</p>
                        </div>
                        <div className="p-4 space-y-3">
                            {recentReports.map(report => (
                                <div key={report.name} className="bg-white rounded-lg border border-gray-200 p-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{report.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${report.categoryColor}`}>{report.category}</span>
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{report.status}</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-1">
                                            <button className="p-1.5 text-gray-500 rounded hover:bg-gray-100"><DownloadIcon className="h-4 w-4"/></button>
                                            <button className="p-1.5 text-gray-500 rounded hover:bg-gray-100"><ShareIcon className="h-4 w-4"/></button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">{`${report.date} - ${report.format} - ${report.downloads} downloads`}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t">
                             <button className="w-full text-center text-sm bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-50 font-semibold text-gray-700">View All Reports</button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                     <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
                     <p className="text-sm text-gray-500 mb-4">Generate commonly used reports instantly</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {quickActions.map(action => {
                            const IconComponent = quickActionIcons[action.icon] ?? ChartBarIcon;
                            return (
                                <button key={action.name} className={`p-4 rounded-lg border border-gray-200 text-left hover:shadow-lg transition-shadow ${action.active ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 hover:bg-gray-50'}`}>
                                    <IconComponent className={`h-6 w-6 mb-2 ${action.active ? 'text-white' : 'text-primary-600'}`} />
                                    <p className="font-semibold">{action.name}</p>
                                </button>
                            );
                        })}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
