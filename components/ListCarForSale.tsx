import React, { useState } from 'react';
import type { Vehicle } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ViewGridIcon } from './icons/ViewGridIcon';
import { CheckIcon } from './icons/CheckIcon';
import { InformationCircleIcon } from './icons/InformationCircleIcon';
import { UploadIcon } from './icons/UploadIcon';

interface ListCarForSaleProps {
    onPublish: (vehicleData: Omit<Vehicle, 'id'>) => Promise<void> | void;
    onCancel: () => void;
}

const STEPS = [
    { id: 1, name: 'Basic Information' },
    { id: 2, name: 'Vehicle Details' },
    { id: 3, name: 'Photos & Description' },
    { id: 4, name: 'Contact & Listing' },
];

const ListCarForSale: React.FC<ListCarForSaleProps> = ({ onPublish, onCancel }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<Omit<Vehicle, 'id'>>>({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        mileage: 0,
        location: '',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        bodyType: 'Sedan',
        color: '',
        engineSize: '',
        doors: 4,
        seats: 5,
        features: [],
        description: '',
        condition: 'Used',
        serviceHistory: '',
        contactPhone: '',
        contactEmail: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({
                ...prev,
                features: checked
                    ? [...(prev.features || []), name]
                    : (prev.features || []).filter(f => f !== name),
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setIsSubmitting(true);
        try {
            await onPublish(formData as Omit<Vehicle, 'id'>);
        } catch (error) {
            console.error('Unable to submit vehicle listing', error);
            setSubmitError(error instanceof Error ? error.message : 'Unable to save listing');
            return;
        } finally {
            setIsSubmitting(false);
        }
    }

    const renderStepContent = () => {
        switch(currentStep) {
            case 1: return <Step1BasicInfo formData={formData} handleChange={handleChange} />;
            case 2: return <Step2VehicleDetails formData={formData} handleChange={handleChange} />;
            case 3: return <Step3PhotosDescription formData={formData} handleChange={handleChange} />;
            case 4: return <Step4ContactListing formData={formData} handleChange={handleChange} />;
            default: return null;
        }
    }

    return (
        <div className="bg-gray-100 min-h-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <button onClick={onCancel} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to Dashboard
                </button>

                <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center">
                        <div className="bg-primary-600 p-2 rounded-lg mr-3">
                            <ViewGridIcon className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">List Car for Sale</h1>
                    </div>
                    <div className="flex items-center space-x-8">
                        {STEPS.map(step => {
                            const isCompleted = currentStep > step.id;
                            const isActive = currentStep === step.id;
                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                        isActive ? 'bg-primary-600 text-white' : isCompleted ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                                    }`}>
                                        {isCompleted ? <CheckIcon className="h-5 w-5" /> : step.id}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                        {renderStepContent()}
                        {submitError && (
                            <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                                {submitError}
                            </div>
                        )}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                             <button type="button" onClick={handlePrev} className={`px-6 py-2 rounded-lg font-semibold text-sm ${currentStep === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`} disabled={currentStep === 1}>
                                Previous
                            </button>
                            {currentStep < STEPS.length ? (
                                <button type="button" onClick={handleNext} className="bg-primary-600 text-white font-semibold px-6 py-2 rounded-lg text-sm hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed" disabled={isSubmitting}>
                                    Next Step
                                </button>
                            ) : (
                                <button type="submit" className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Publish Listing'}
                                </button>
                            )}
                        </div>
                    </div>
                </form>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center mb-3">
                        <InformationCircleIcon className="h-5 w-5 text-primary-600 mr-2" />
                        <h3 className="font-semibold text-gray-800">Listing Tips</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                            <h4 className="font-medium text-gray-700 mb-1">Photo Tips</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Take photos in good lighting</li>
                                <li>Include interior and exterior shots</li>
                                <li>Show any damage or wear honestly</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-medium text-gray-700 mb-1">Description Tips</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Be honest about the vehicle's condition</li>
                                <li>Include recent maintenance</li>
                                <li>Mention any modifications</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormField: React.FC<{ children: React.ReactNode, title: string, subtitle?: string}> = ({ children, title, subtitle }) => (
    <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        <div className="mt-4">
            {children}
        </div>
    </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string, helperText?: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{props.label}</label>
        <input {...props} className="bg-white w-full px-3 py-2 text-sm border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
        {props.helperText && <p className="text-xs text-gray-500 mt-1">{props.helperText}</p>}
    </div>
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, children: React.ReactNode }) => (
     <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{props.label}</label>
        <select {...props} className="w-full px-3 py-2 text-sm border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white">
            {props.children}
        </select>
    </div>
);

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <label className="flex items-center space-x-2">
        <input type="checkbox" {...props} className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
        <span className="text-sm text-gray-700">{props.label}</span>
    </label>
);


const Step1BasicInfo: React.FC<{formData: any, handleChange: any}> = ({ formData, handleChange }) => (
    <FormField title="Basic Information" subtitle="Tell us about your vehicle">
        <div className="grid grid-cols-2 gap-4">
            <Select label="Make *" name="make" value={formData.make} onChange={handleChange}>
                <option>Select make</option><option>Toyota</option><option>Honda</option><option>Ford</option><option>Mercedes-Benz</option>
            </Select>
            <Input label="Model *" name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Camry, Accord, Altima" />
            <Select label="Year *" name="year" value={formData.year} onChange={handleChange}>
                 {[...Array(30)].map((_, i) => <option key={i} value={2025 - i}>{2025 - i}</option>)}
            </Select>
            <Input label="Price (₦) *" name="price" type="number" value={formData.price} onChange={handleChange} placeholder="e.g., 8,500,000" />
            <Input label="Mileage (km) *" name="mileage" type="number" value={formData.mileage} onChange={handleChange} placeholder="e.g., 45,000" />
            <Select label="Location *" name="location" value={formData.location} onChange={handleChange}>
                <option>Select location</option><option>Lagos</option><option>Abuja</option><option>Port Harcourt</option>
            </Select>
        </div>
    </FormField>
);

const Step2VehicleDetails: React.FC<{formData: any, handleChange: any}> = ({ formData, handleChange }) => (
    <FormField title="Vehicle Details" subtitle="Specifications and features">
        <div className="grid grid-cols-2 gap-4 mb-6">
            <Select label="Transmission *" name="transmission" value={formData.transmission} onChange={handleChange}><option>Automatic</option><option>Manual</option></Select>
            <Select label="Fuel Type *" name="fuelType" value={formData.fuelType} onChange={handleChange}><option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option></Select>
            <Select label="Body Type *" name="bodyType" value={formData.bodyType} onChange={handleChange}><option>Sedan</option><option>SUV</option><option>Coupe</option><option>Hatchback</option></Select>
            <Input label="Color" name="color" value={formData.color} onChange={handleChange} placeholder="e.g., Silver, Black, White" />
            <Input label="Engine Size" name="engineSize" value={formData.engineSize} onChange={handleChange} placeholder="e.g., 2.2L, 1.6L Turbo" />
            <Select label="Number of Doors" name="doors" value={formData.doors} onChange={handleChange}><option>2</option><option>3</option><option>4</option><option>5</option></Select>
            <Select label="Number of Seats" name="seats" value={formData.seats} onChange={handleChange}><option>2</option><option>4</option><option>5</option><option>7</option><option>8+</option></Select>
        </div>
        <h3 className="text-md font-semibold text-gray-800 mb-3">Features & Equipment</h3>
        <div className="grid grid-cols-4 gap-3">
            {['Air Conditioning', 'Power Steering', 'Power Windows', 'Central Locking', 'ABS Brakes', 'Airbags', 'Bluetooth', 'USB Port', 'Navigation System', 'Leather Seats', 'Sunroof', 'Alloy Wheels', 'Fog Lights', 'Cruise Control', 'Parking Sensors', 'Reverse Camera', 'Climate Control', 'Electric Mirrors'].map(feature => (
                 <Checkbox key={feature} label={feature} name={feature} checked={formData.features?.includes(feature)} onChange={handleChange} />
            ))}
        </div>
    </FormField>
);

const Step3PhotosDescription: React.FC<{formData: any, handleChange: any}> = ({ formData, handleChange }) => (
    <FormField title="Photos & Description" subtitle="Showcase your vehicle with photos and details">
        <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Vehicle Photos</h3>
            <p className="text-sm text-gray-500 mb-3">Upload up to 20 photos. First photo will be your main image.</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <UploadIcon className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drag and drop images here, or click to browse</p>
                <button type="button" className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50">Choose Files</button>
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="bg-white w-full px-3 py-2 text-sm border border-gray-400 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="Describe your vehicle's condition, history, and any special features..."></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
             <Select label="Vehicle Condition *" name="condition" value={formData.condition} onChange={handleChange}><option>Used</option><option>New</option><option>Foreign Used</option></Select>
             <Input label="Service History" name="serviceHistory" value={formData.serviceHistory} onChange={handleChange} placeholder="Recent services, maintenance records..." />
        </div>
    </FormField>
);

const Step4ContactListing: React.FC<{formData: any, handleChange: any}> = ({ formData, handleChange }) => (
    <FormField title="Contact & Listing Options" subtitle="Finalize your listing details">
        <div className="grid grid-cols-2 gap-4 mb-6">
            <Input label="Contact Phone *" name="contactPhone" type="tel" value={formData.contactPhone} onChange={handleChange} placeholder="+234 800 000 0000" />
            <Input label="Contact Email" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} placeholder="your@email.com" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <Select label="Listing Duration" name="listingDuration"><option>30 days</option><option>60 days</option><option>90 days</option></Select>
        </div>
         <h3 className="text-md font-semibold text-gray-800 mb-3">Listing Options</h3>
         <div className="space-y-3">
             <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div>
                    <h4 className="font-medium text-gray-800">Featured Listing</h4>
                    <p className="text-sm text-gray-500">Get priority placement in search results</p>
                </div>
                <input type="radio" name="listingType" className="h-4 w-4 text-primary-600 focus:ring-primary-500" />
             </div>
             <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div>
                    <h4 className="font-medium text-gray-800">Instant Booking</h4>
                    <p className="text-sm text-gray-500">Allow customers to book test drives instantly</p>
                </div>
                <input type="radio" name="listingType" className="h-4 w-4 text-primary-600 focus:ring-primary-500" />
             </div>
         </div>
         <div className="mt-6 bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <h4 className="font-semibold text-gray-800">Listing Fee</h4>
            <div className="text-right">
                <p className="font-bold text-lg text-gray-900">₦0</p>
                <p className="text-sm text-green-600 font-medium">Free</p>
            </div>
         </div>
    </FormField>
);

export default ListCarForSale;
