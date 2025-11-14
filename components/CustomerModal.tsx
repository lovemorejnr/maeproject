import React, { useState, FormEvent } from 'react';
import type { Customer, CustomerStatus, CustomerType } from '../types';
import { UserIcon } from './icons/UserIcon';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { OfficeBuildingIcon } from './icons/OfficeBuildingIcon';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomer: (customerData: Omit<Customer, 'id' | 'initials' | 'totalSpent' | 'purchases' | 'enquiries' | 'lastContact'>) => void;
}

// Helper component for input fields with icons
const InputFieldWithIcon: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon: React.ReactNode; }> = ({ label, icon, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                {...props}
                className="block w-full pl-10 pr-3 py-2 border border-gray-400 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white"
            />
        </div>
    </div>
);


const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    type: 'Individual' as CustomerType,
    status: 'Lead' as CustomerStatus,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddCustomer(formData);
    // Reset form for next use
    setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        location: '',
        type: 'Individual' as CustomerType,
        status: 'Lead' as CustomerStatus,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b bg-gray-50 rounded-t-lg">
            <h2 className="text-xl font-bold text-gray-900">Add New Customer</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full text-2xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                {/* Contact Information Section */}
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
                    <p className="mt-1 text-sm text-gray-500">Provide the primary contact details for the customer.</p>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <InputFieldWithIcon label="Full Name *" name="name" value={formData.name} onChange={handleChange} required icon={<UserIcon className="h-5 w-5 text-gray-400"/>} />
                        </div>
                        <InputFieldWithIcon label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} required icon={<MailIcon className="h-5 w-5 text-gray-400"/>} />
                        <InputFieldWithIcon label="Phone Number *" name="phone" type="tel" value={formData.phone} onChange={handleChange} required icon={<PhoneIcon className="h-5 w-5 text-gray-400"/>} />
                    </div>
                </div>

                {/* Company Details Section */}
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Company & Location</h3>
                    <p className="mt-1 text-sm text-gray-500">Enter information about the customer's company and location.</p>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <InputFieldWithIcon label="Company Name *" name="company" value={formData.company} onChange={handleChange} required icon={<OfficeBuildingIcon className="h-5 w-5 text-gray-400"/>} />
                        <InputFieldWithIcon label="Location *" name="location" value={formData.location} onChange={handleChange} required icon={<LocationMarkerIcon className="h-5 w-5 text-gray-400"/>} />
                    </div>
                </div>

                 {/* Customer Profile Section */}
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Customer Profile</h3>
                    <p className="mt-1 text-sm text-gray-500">Classify the customer for better management and reporting.</p>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                <option>Individual</option>
                                <option>Business</option>
                                <option>Government</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="block w-full py-2 px-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                <option>Lead</option>
                                <option>Active</option>
                                <option>Prospect</option>
                                <option>VIP</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center p-4 border-t bg-gray-50 rounded-b-lg space-x-3">
                <button type="button" onClick={onClose} className="bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                    Cancel
                </button>
                <button type="submit" className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                    Add Customer
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;