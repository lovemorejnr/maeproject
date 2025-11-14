import React from 'react';
import type { DocumentVaultData } from '../types';
import { FolderPlusIcon } from './icons/FolderPlusIcon';
import { UploadCloudIcon } from './icons/UploadCloudIcon';
import { DocumentDuplicateIcon } from './icons/DocumentDuplicateIcon';
import { DocumentCheckIcon } from './icons/DocumentCheckIcon';
import { ArchiveIcon } from './icons/ArchiveIcon';
import { FolderOpenIcon } from './icons/FolderOpenIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { FilterIcon } from './icons/FilterIcon';
import { FileIcon } from './icons/FileIcon';
import { DotsVerticalIcon } from './icons/DotsVerticalIcon';

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

const tagColors: { [key: string]: string } = {
    Legal: 'bg-blue-100 text-blue-800',
    Insurance: 'bg-orange-100 text-orange-800',
    Financial: 'bg-green-100 text-green-800',
    Active: 'bg-green-100 text-green-800',
};

interface DocumentVaultProps {
    data: DocumentVaultData;
}

const DocumentVault: React.FC<DocumentVaultProps> = ({ data }) => {
    const { kpis, insights, documents } = data;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Document Vault</h1>
                        <p className="text-sm text-gray-500">Securely store and manage vehicle documents</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50">
                            <FolderPlusIcon className="h-4 w-4 mr-2" /> New Folder
                        </button>
                        <button className="flex items-center bg-primary-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-primary-700">
                            <UploadCloudIcon className="h-4 w-4 mr-2" /> Upload Document
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KpiCard title="Total Documents" value={kpis.total.toString()} subtext={`${kpis.totalSize} MB total`} icon={<DocumentDuplicateIcon className="h-7 w-7" />} />
                    <KpiCard title="Active" value={kpis.active.toString()} subtext="Currently in use" icon={<DocumentCheckIcon className="h-7 w-7" />} />
                    <KpiCard title="Archived" value={kpis.archived.toString()} subtext="Stored safely" icon={<ArchiveIcon className="h-7 w-7" />} />
                    <KpiCard title="Storage Used" value={`${kpis.storageUsed} MB`} subtext={`of ${kpis.storageLimit} GB limit`} icon={<FolderOpenIcon className="h-7 w-7" />} />
                </div>

                {/* JuneAI Insights */}
                <div className="bg-purple-50/50 rounded-lg border border-purple-200/80 p-6 mb-8">
                    <div className="flex items-center mb-4">
                        <SparklesIcon className="h-6 w-6 text-purple-600 mr-3" />
                        <h2 className="text-lg font-semibold text-gray-800">JuneAI Document Insights</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">AI-powered document management and compliance monitoring</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-red-200/80 flex items-start space-x-4">
                            <ExclamationTriangleIcon className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-red-800">{insights.expiring.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{insights.expiring.description}</p>
                                <a href="#" className="text-sm font-semibold text-primary-600 hover:underline mt-2 inline-block">Schedule Renewals &rarr;</a>
                            </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-green-200/80 flex items-start space-x-4">
                            <CheckBadgeIcon className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-green-800">{insights.compliance.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{insights.compliance.description}</p>
                                <a href="#" className="text-sm font-semibold text-primary-600 hover:underline mt-2 inline-block">View Report &rarr;</a>
                            </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-blue-200/80 flex items-start space-x-4">
                            <ShieldCheckIcon className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-blue-800">{insights.security.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{insights.security.description}</p>
                                <a href="#" className="text-sm font-semibold text-primary-600 hover:underline mt-2 inline-block">Security Settings &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Document Library */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Document Library</h2>
                        <p className="text-sm text-gray-500">All your vehicle-related documents in one secure location</p>
                    </div>
                    <div className="p-4 flex flex-wrap items-center gap-2 border-b border-gray-200">
                        <div className="relative flex-grow">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input type="text" placeholder="Search documents..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white" />
                        </div>
                        <div className="flex gap-2">
                           <button className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-2">All Categories <ChevronDownIcon className="h-4 w-4 ml-2" /></button>
                           <button className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-2">All Types <ChevronDownIcon className="h-4 w-4 ml-2" /></button>
                           <button className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-2">All Status <ChevronDownIcon className="h-4 w-4 ml-2" /></button>
                           <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"><FilterIcon className="h-5 w-5"/></button>
                        </div>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {documents.map(doc => (
                            <div key={doc.name} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start space-x-3">
                                        <FileIcon className="h-10 w-10 text-gray-400 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-800 break-all">{doc.name}</p>
                                            <p className="text-xs text-gray-500">{doc.size}</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600"><DotsVerticalIcon className="h-5 w-5" /></button>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    {doc.tags.map(tag => (
                                        <span key={tag} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-3 text-sm text-gray-600 border-t pt-3">
                                    <p className="font-medium">{doc.type}</p>
                                    <p className="text-xs text-gray-500">{doc.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentVault;
