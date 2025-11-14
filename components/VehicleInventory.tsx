import React, { useMemo, useState } from 'react';
import type { Dealership, Vehicle } from '../types';
import VehicleCard from './VehicleCard';
import { CarIcon } from './icons/CarIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import VehicleDetailModal from './VehicleDetailModal';
import VehicleModal from './VehicleModal';

interface VehicleInventoryProps {
  dealership: Dealership;
  onDeleteVehicle: (vehicleId: string) => void;
  onUpdateVehicle: (vehicle: Vehicle) => void;
}

const VehicleInventory: React.FC<VehicleInventoryProps> = ({ dealership, onDeleteVehicle, onUpdateVehicle }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const stats = useMemo(() => {
    const totalVehicles = dealership.vehicles.length;
    const available = dealership.vehicles.filter(v => v.status === 'Available').length;
    const sold = dealership.vehicles.filter(v => v.status === 'Sold').length;
    return { totalVehicles, available, sold };
  }, [dealership.vehicles]);

  const StatCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => (
    <div className="bg-white rounded-xl shadow p-6 flex items-center">
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
  
  const handleEditClick = (vehicleId: string) => {
    const vehicleToEdit = dealership.vehicles.find(v => v.id === vehicleId);
    if (vehicleToEdit) {
        setEditingVehicle(vehicleToEdit);
    }
  };
  
  const handleSaveEdit = (vehicleData: Omit<Vehicle, 'id'> | Vehicle) => {
    onUpdateVehicle(vehicleData as Vehicle);
    setEditingVehicle(null);
  };

  const handleEditFromDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(null);
    setEditingVehicle(vehicle);
  };

  const handleDeleteFromDetail = (vehicleId: string) => {
    setSelectedVehicle(null);
    onDeleteVehicle(vehicleId);
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Car Inventory: {dealership.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Vehicles" value={stats.totalVehicles} icon={<CarIcon className="h-6 w-6 text-white"/>} color="bg-primary-500" />
          <StatCard title="Available" value={stats.available} icon={<CheckCircleIcon className="h-6 w-6 text-white"/>} color="bg-green-500" />
          <StatCard title="Sold" value={stats.sold} icon={<DollarSignIcon className="h-6 w-6 text-white"/>} color="bg-red-500" />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Inventory List</h2>

        {dealership.vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealership.vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onDelete={onDeleteVehicle}
                onCardClick={setSelectedVehicle}
                onEdit={handleEditClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <CarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new vehicle.</p>
          </div>
        )}
      </div>
      {selectedVehicle && (
        <VehicleDetailModal 
          isOpen={!!selectedVehicle}
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onEdit={handleEditFromDetail}
          onDelete={handleDeleteFromDetail}
        />
      )}
      <VehicleModal 
         isOpen={!!editingVehicle}
         onClose={() => setEditingVehicle(null)}
         onSave={handleSaveEdit}
         vehicle={editingVehicle}
      />
    </>
  );
};

export default VehicleInventory;
