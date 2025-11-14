import React from 'react';
import { CarIcon } from './icons/CarIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UsersIcon } from './icons/UsersIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { CollectionIcon } from './icons/CollectionIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { CashIcon } from './icons/CashIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { DocumentDuplicateIcon } from './icons/DocumentDuplicateIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { CogIcon } from './icons/CogIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = {
    Overview: [
      { name: 'Dashboard', icon: ChartBarIcon, view: 'dashboard' },
      { name: 'JuneAI', icon: SparklesIcon, view: 'juneai' },
    ],
    'Analytics & Management': [
      { name: 'Sales Analytics', icon: TrendingUpIcon, view: 'analytics' },
      { name: 'User Management', icon: UsersIcon, view: 'users' },
      { name: 'Reports', icon: DocumentTextIcon, view: 'reports' },
    ],
    Operations: [
      { name: 'Car Inventory', icon: CollectionIcon, view: 'inventory' },
      { name: 'Customers', icon: UserGroupIcon, view: 'customers' },
      { name: 'Sales Orders', icon: CashIcon, view: 'orders' },
    ],
    Resources: [
      { name: 'Document Vault', icon: DocumentDuplicateIcon, view: 'documentVault' },
      { name: 'Dealer Marketplace', icon: ShoppingCartIcon, view: 'marketplace' },
    ],
    System: [
      { name: 'System Settings', icon: CogIcon, view: 'settings' },
      { name: 'Database Backup', icon: DatabaseIcon, view: 'backup' },
    ]
  };

  // FIX: Explicitly type NavLink as React.FC to ensure the 'key' prop is handled correctly by TypeScript.
  const NavLink: React.FC<{ name: string, icon: React.FC<any>, view: string }> = ({ name, icon: Icon, view }) => (
    <li>
      <button
        onClick={() => setActiveView(view)}
        className={`w-full text-left flex items-center px-3 py-2.5 my-1 rounded-md text-sm font-medium transition-colors duration-150 ${
          activeView === view
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <Icon className="h-5 w-5 mr-3" />
        <span className="truncate">{name}</span>
      </button>
    </li>
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div className="px-4 h-16 flex justify-center items-center border-b border-gray-200">
        <img src="https://res.cloudinary.com/dl4qho6ia/image/upload/v1763078811/dr_c4dth1.png" alt="Application Logo" className="h-9 w-auto" />
      </div>
      <nav className="flex-1 mt-4 p-2 overflow-y-auto">
        {Object.entries(navItems).map(([section, items]) => (
          <div key={section} className="mb-4">
            <h2 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {section}
            </h2>
            <ul>
              {/* FIX: The key prop is reserved for React and not passed to components. Using explicit props instead of spreading to avoid type errors. */}
              {items.map(item => <NavLink key={item.name} name={item.name} icon={item.icon} view={item.view} />)}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-2 border-t border-gray-200">
        <div className="p-2 rounded-md hover:bg-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
              JD
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">System Administrator</p>
            </div>
          </div>
        </div>
        <button
          className="w-full text-left flex items-center px-3 py-2.5 my-1 rounded-md text-sm font-medium transition-colors duration-150 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <LogoutIcon className="h-5 w-5 mr-3"/>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;