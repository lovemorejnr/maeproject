import React, { useState, useEffect, FormEvent, useRef } from 'react';
import type { Vehicle } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => Promise<void> | void;
  vehicle: Vehicle | null;
}

const ALL_FEATURES = [
    'Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 
    'ABS Brakes', 'Airbags', 'Bluetooth', 'USB Port', 'Navigation System', 
    'Leather Seats', 'Sunroof', 'Alloy Wheels', 'Fog Lights', 'Cruise Control', 
    'Parking Sensors', 'Reverse Camera', 'Climate Control', 'Electric Mirrors'
];

type TabName = 'specifications' | 'features' | 'description';

const VehicleModal: React.FC<VehicleModalProps> = ({ isOpen, onClose, onSave, vehicle }) => {
  const [formData, setFormData] = useState<Partial<Vehicle>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabName>('specifications');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
      setActiveTab('specifications'); // Reset to first tab when vehicle changes
    }
  }, [vehicle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isNumeric = ['year', 'price', 'mileage', 'doors', 'seats'].includes(name);
    setFormData((prev) => ({
      ...prev,
      [name]: isNumeric ? (parseInt(value, 10) || '') : value,
    }));
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
        ...prev,
        features: checked
            ? [...(prev.features || []), name]
            : (prev.features || []).filter(f => f !== name),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setIsSaving(true);
    try {
      await onSave(formData as Vehicle);
      onClose();
    } catch (error) {
      console.error('Unable to save vehicle changes', error);
      setSaveError(error instanceof Error ? error.message : 'Unable to save vehicle');
      return;
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !vehicle) return null;

  const TabButton: React.FC<{tabName: TabName, currentTab: TabName, children: React.ReactNode}> = ({tabName, currentTab, children}) => (
    <button
      type="button"
      onClick={() => setActiveTab(tabName)}
      className={`px-1 py-3 text-sm font-semibold border-b-2 transition-colors duration-200
        ${currentTab === tabName ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Edit Vehicle Listing</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 text-2xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex overflow-hidden">
          {/* Left Column */}
          <div className="w-1/3 border-r bg-gray-50 p-6 flex flex-col space-y-6">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <img src={formData.imageUrl} alt="Vehicle" className="w-full h-48 object-cover rounded-lg bg-gray-200" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <UploadIcon className="h-8 w-8 text-white mr-2"/>
                <span className="text-white font-semibold">Change Photo</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">{formData.year} {formData.make} {formData.model}</h3>
              <p className="text-2xl font-extrabold text-primary-600 mt-2">
                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(formData.price || 0)}
              </p>
              <div className="text-sm text-gray-600 mt-2">
                <p>Mileage: <span className="font-medium text-gray-800">{(formData.mileage || 0).toLocaleString()} km</span></p>
                <p>VIN: <span className="font-medium text-gray-800">{formData.vin}</span></p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-2/3 flex flex-col">
            <div className="border-b px-6 flex space-x-6 flex-shrink-0">
                <TabButton tabName="specifications" currentTab={activeTab}>Specifications</TabButton>
                <TabButton tabName="features" currentTab={activeTab}>Features</TabButton>
                <TabButton tabName="description" currentTab={activeTab}>Description</TabButton>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  <h3 className="text-md font-semibold text-gray-800">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Make" name="make" value={formData.make} onChange={handleChange} />
                    <InputField label="Model" name="model" value={formData.model} onChange={handleChange} />
                    <InputField label="Year" name="year" type="number" value={formData.year} onChange={handleChange} />
                    <InputField label="Price (NGN)" name="price" type="number" value={formData.price} onChange={handleChange} />
                    <InputField label="Mileage (km)" name="mileage" type="number" value={formData.mileage} onChange={handleChange} />
                    <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
                    <InputField label="VIN" name="vin" value={formData.vin} onChange={handleChange} />
                    <SelectField label="Status" name="status" value={formData.status} onChange={handleChange}>
                        <option>Available</option><option>Sold</option><option>Pending</option>
                    </SelectField>
                     <SelectField label="Condition" name="condition" value={formData.condition} onChange={handleChange}>
                        <option>Used</option><option>New</option><option>Foreign Used</option>
                    </SelectField>
                  </div>
                  <h3 className="text-md font-semibold text-gray-800 pt-4">Technical Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <SelectField label="Transmission" name="transmission" value={formData.transmission} onChange={handleChange}><option>Automatic</option><option>Manual</option></SelectField>
                    <SelectField label="Fuel Type" name="fuelType" value={formData.fuelType} onChange={handleChange}><option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option></SelectField>
                    <SelectField label="Body Type" name="bodyType" value={formData.bodyType} onChange={handleChange}><option>Sedan</option><option>SUV</option><option>Coupe</option><option>Hatchback</option></SelectField>
                    <InputField label="Color" name="color" value={formData.color} onChange={handleChange} />
                    <InputField label="Engine Size" name="engineSize" value={formData.engineSize} onChange={handleChange} />
                    <SelectField label="Doors" name="doors" value={formData.doors} onChange={handleChange}><option>2</option><option>3</option><option>4</option><option>5</option></SelectField>
                    <SelectField label="Seats" name="seats" value={formData.seats} onChange={handleChange}><option>2</option><option>4</option><option>5</option><option>7</option><option>8+</option></SelectField>
                  </div>
                </div>
              )}
              {activeTab === 'features' && (
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Features & Equipment</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {ALL_FEATURES.map(feature => (
                           <CheckboxField key={feature} label={feature} name={feature} checked={formData.features?.includes(feature)} onChange={handleFeatureChange} />
                      ))}
                  </div>
                </div>
              )}
               {activeTab === 'description' && (
                <div className="space-y-4">
                  <TextareaField label="Description" name="description" value={formData.description} onChange={handleChange} rows={8} placeholder="Describe the vehicle's condition, unique features, and any other relevant details for potential buyers." />
                  <TextareaField label="Service History" name="serviceHistory" value={formData.serviceHistory} onChange={handleChange} rows={4} placeholder="Mention recent services, maintenance records, warranty information, etc." />
                </div>
              )}
            </div>
          </div>
        </form>

        <div className="flex justify-end items-center p-4 border-t bg-gray-50 rounded-b-lg space-x-3 flex-shrink-0">
          {saveError && (
            <p className="text-sm text-red-600 mr-auto">{saveError}</p>
          )}
          <button type="button" onClick={onClose} className="bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50" disabled={isSaving}>
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};


// Helper components for form fields
const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input {...props} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-gray-900" />
  </div>
);

const SelectField: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, children: React.ReactNode }> = ({ label, children, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select {...props} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-gray-900">
      {children}
    </select>
  </div>
);

const TextareaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea {...props} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-gray-900"></textarea>
    </div>
);

const CheckboxField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <label className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
        <input type="checkbox" {...props} className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
        <span className="text-sm text-gray-700 select-none">{label}</span>
    </label>
);

export default VehicleModal;
