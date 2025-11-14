import React from 'react';
import type { Vehicle, VehicleStatus } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { PencilIcon } from './icons/PencilIcon';

interface VehicleCardProps {
  vehicle: Vehicle;
  onDelete: (vehicleId: string) => void;
  onCardClick: (vehicle: Vehicle) => void;
  onEdit: (vehicleId: string) => void;
}

const statusColors: Record<VehicleStatus, string> = {
  Available: 'bg-green-100 text-green-800',
  Sold: 'bg-red-100 text-red-800',
  Pending: 'bg-yellow-100 text-yellow-800',
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onDelete, onCardClick, onEdit }) => {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(vehicle.price);

  const formattedMileage = new Intl.NumberFormat('en-US').format(vehicle.mileage);

  return (
    <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col cursor-pointer"
        onClick={() => onCardClick(vehicle)}
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
        />
        <span className={`absolute top-2 right-2 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${statusColors[vehicle.status]}`}>
          {vehicle.status}
        </span>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 truncate">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-sm text-gray-600 mb-3">VIN: {vehicle.vin}</p>
        
        <div className="flex justify-between items-baseline text-gray-900 mb-3">
          <span className="text-2xl font-extrabold tracking-tight">{formattedPrice}</span>
        </div>
        
        <div className="text-sm text-gray-500">
          {formattedMileage} Miles
        </div>
      </div>
       <div className="p-4 bg-gray-50 mt-auto flex justify-end space-x-2">
          <button
            onClick={(e) => {
                e.stopPropagation();
                onEdit(vehicle.id);
            }}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-primary-600 transition-colors"
            aria-label="Edit vehicle"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
                e.stopPropagation();
                onDelete(vehicle.id);
            }}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-red-600 transition-colors"
            aria-label="Delete vehicle"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
    </div>
  );
};

export default VehicleCard;