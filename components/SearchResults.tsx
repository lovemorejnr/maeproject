import React, { useMemo } from 'react';
import type { Vehicle, Customer } from '../types';
import { CarIcon } from './icons/CarIcon';
import { UsersIcon } from './icons/UsersIcon';
import { SearchIcon } from './icons/SearchIcon';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';

interface SearchResultsProps {
    query: string;
    vehicles: Vehicle[];
    customers: Customer[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, vehicles, customers }) => {

    const filteredVehicles = useMemo(() => {
        if (!query) return [];
        const lowercasedQuery = query.toLowerCase();
        return vehicles.filter(vehicle =>
            vehicle.make.toLowerCase().includes(lowercasedQuery) ||
            vehicle.model.toLowerCase().includes(lowercasedQuery) ||
            vehicle.year.toString().includes(lowercasedQuery) ||
            vehicle.vin.toLowerCase().includes(lowercasedQuery)
        );
    }, [query, vehicles]);

    const filteredCustomers = useMemo(() => {
        if (!query) return [];
        const lowercasedQuery = query.toLowerCase();
        return customers.filter(customer =>
            customer.name.toLowerCase().includes(lowercasedQuery) ||
            customer.company.toLowerCase().includes(lowercasedQuery) ||
            customer.email.toLowerCase().includes(lowercasedQuery) ||
            customer.phone.toLowerCase().includes(lowercasedQuery)
        );
    }, [query, customers]);

    const VehicleResultCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center space-x-4 hover:shadow-md transition-shadow">
            <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="w-24 h-20 object-cover rounded-md flex-shrink-0 bg-gray-200" />
            <div className="flex-grow">
                <p className="font-bold text-gray-800">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                <p className="text-sm text-gray-500">VIN: {vehicle.vin}</p>
                <p className="text-lg font-semibold text-primary-600 mt-1">
                    {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(vehicle.price)}
                </p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                vehicle.status === 'Available' ? 'bg-green-100 text-green-800' : 
                vehicle.status === 'Sold' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'
            }`}>
                {vehicle.status}
            </span>
        </div>
    );
    
    const CustomerResultCard: React.FC<{ customer: Customer }> = ({ customer }) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center space-x-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                {customer.initials}
            </div>
            <div className="flex-grow">
                <p className="font-bold text-gray-800">{customer.name}</p>
                <p className="text-sm text-gray-500">{customer.company}</p>
                 <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                    <span className="flex items-center"><MailIcon className="h-3.5 w-3.5 mr-1 text-gray-400" /> {customer.email}</span>
                    <span className="flex items-center"><PhoneIcon className="h-3.5 w-3.5 mr-1 text-gray-400" /> {customer.phone}</span>
                </div>
            </div>
        </div>
    );

    const NoResults: React.FC<{ message: string }> = ({ message }) => (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
            <SearchIcon className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Results Found</h3>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Search Results for: <span className="text-primary-600">"{query}"</span>
            </h1>

            <div className="space-y-8">
                {/* Vehicle Results */}
                <div>
                    <div className="flex items-center mb-4">
                        <CarIcon className="h-6 w-6 text-gray-500 mr-3" />
                        <h2 className="text-xl font-semibold text-gray-800">Vehicle Results ({filteredVehicles.length})</h2>
                    </div>
                    {filteredVehicles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredVehicles.map(v => <VehicleResultCard key={v.id} vehicle={v} />)}
                        </div>
                    ) : (
                        <NoResults message="No vehicles matched your search query." />
                    )}
                </div>

                {/* Customer Results */}
                <div>
                    <div className="flex items-center mb-4">
                        <UsersIcon className="h-6 w-6 text-gray-500 mr-3" />
                        <h2 className="text-xl font-semibold text-gray-800">Customer Results ({filteredCustomers.length})</h2>
                    </div>
                     {filteredCustomers.length > 0 ? (
                        <div className="space-y-3">
                            {filteredCustomers.map(c => <CustomerResultCard key={c.id} customer={c} />)}
                        </div>
                    ) : (
                        <NoResults message="No customers matched your search query." />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
