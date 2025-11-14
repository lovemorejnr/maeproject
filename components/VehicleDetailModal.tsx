import React from 'react';
import type { Vehicle } from '../types';
import { CogIcon } from './icons/CogIcon';
import { FuelIcon } from './icons/FuelIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CarIcon } from './icons/CarIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface VehicleDetailModalProps {
  isOpen: boolean;
  vehicle: Vehicle | null;
  onClose: () => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicleId: string) => void;
}

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | number | null }) => (
    <div className="flex items-center text-sm text-gray-600">
        <div className="w-5 mr-3 text-gray-400">{icon}</div>
        <span className="font-medium text-gray-800">{label}:</span>
        <span className="ml-2">{value || 'N/A'}</span>
    </div>
);

const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ isOpen, vehicle, onClose, onEdit, onDelete }) => {
  if (!isOpen || !vehicle) return null;

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(vehicle.price);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 text-2xl leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-auto rounded-lg object-cover mb-4" />
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">Key Information</h3>
                        <p className="text-3xl font-extrabold text-primary-600 mb-2">{formattedPrice}</p>
                        <p className="text-md text-gray-600">Mileage: <span className="font-semibold">{vehicle.mileage.toLocaleString()} km</span></p>
                        <p className="text-md text-gray-600">Location: <span className="font-semibold">{vehicle.location}</span></p>
                        <p className="text-md text-gray-600">Condition: <span className="font-semibold">{vehicle.condition}</span></p>
                    </div>
                </div>
                <div>
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-2">Specifications</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <DetailItem icon={<CogIcon />} label="Transmission" value={vehicle.transmission} />
                            <DetailItem icon={<FuelIcon />} label="Fuel Type" value={vehicle.fuelType} />
                            <DetailItem icon={<CarIcon />} label="Body Type" value={vehicle.bodyType} />
                            <DetailItem icon={<UsersIcon />} label="Seats" value={vehicle.seats} />
                            <DetailItem icon={<CarIcon className="transform -scale-x-100"/>} label="Doors" value={vehicle.doors} />
                            <DetailItem icon={<CogIcon />} label="Engine" value={vehicle.engineSize} />
                            <DetailItem icon={<div className="w-4 h-4 rounded-full border border-gray-400" style={{backgroundColor: vehicle.color?.toLowerCase()}}/>} label="Color" value={vehicle.color} />
                        </div>
                    </div>
                     <div className="mb-6">
                        <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-2">Features & Equipment</h3>
                        {vehicle.features && vehicle.features.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {vehicle.features.map(feature => (
                                    <div key={feature} className="flex items-center text-sm text-gray-700">
                                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2"/> {feature}
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-sm text-gray-500">No special features listed.</p>}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-2">Description & History</h3>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap mb-4">{vehicle.description || 'No description provided.'}</p>
                        <h4 className="font-semibold text-md text-gray-700 mb-1">Service History</h4>
                        <p className="text-sm text-gray-600">{vehicle.serviceHistory || 'No service history provided.'}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-end items-center p-4 border-t bg-gray-50 rounded-b-lg space-x-3">
            <button 
                onClick={() => onEdit(vehicle)}
                className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100"
            >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
            </button>
            <button 
                onClick={() => onDelete(vehicle.id)}
                className="flex items-center bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-700"
            >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
            </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailModal;