import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Notification } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { SearchIcon } from './icons/SearchIcon';
import { BellIcon } from './icons/BellIcon';
import { CarIcon } from './icons/CarIcon';
import { UsersIcon } from './icons/UsersIcon';

interface HeaderProps {
  onAddVehicle: () => void;
  notifications: Notification[];
  onMarkNotificationsRead: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 10) return "just now";
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const Icon = notification.type === 'vehicle' ? CarIcon : UsersIcon;
    return (
        <div className="p-3 flex items-start hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
            <div className={`p-2 rounded-full mr-3 ${notification.type === 'vehicle' ? 'bg-blue-100' : 'bg-green-100'}`}>
                <Icon className={`h-5 w-5 ${notification.type === 'vehicle' ? 'text-blue-500' : 'text-green-500'}`} />
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-800">{notification.title}</p>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(notification.timestamp)}</p>
            </div>
        </div>
    );
};

const NotificationPanel: React.FC<{ notifications: Notification[] }> = ({ notifications }) => {
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-3 border-b">
                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="text-center text-sm text-gray-500 py-6">No notifications yet.</p>
                ) : (
                    notifications.map(notification => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))
                )}
            </div>
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ onAddVehicle, notifications, onMarkNotificationsRead, searchQuery, onSearchChange, onSearchSubmit }) => {
  const [activeRole, setActiveRole] = useState('Admin');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);


  const toggleNotifications = () => {
    if (!isNotificationsOpen && unreadCount > 0) {
        onMarkNotificationsRead();
    }
    setIsNotificationsOpen(prev => !prev);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
            setIsNotificationsOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const RoleButton = ({ role }: { role: string }) => (
    <button
      onClick={() => setActiveRole(role)}
      className={`px-3 py-2 text-sm font-semibold transition-colors border-b-2 ${
        activeRole === role
          ? 'border-primary-600 text-primary-700'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      {role}
    </button>
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 h-16 flex justify-between items-center flex-shrink-0 z-10">
      
      {/* LEFT SIDE: Roles & Search */}
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <RoleButton role="Admin" />
          <RoleButton role="Manager" />
          <RoleButton role="Staff" />
        </div>
        
        <form onSubmit={handleSearch} className="w-80 my-auto">
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search vehicles, customers, deals..."
              className="w-full pl-11 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-300 focus:border-primary-500 bg-white placeholder-gray-500 transition-colors focus:outline-none"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* RIGHT SIDE: Actions */}
      <div className="flex items-center justify-end space-x-4">
        <button
          onClick={onAddVehicle}
          className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          List Car for Sale
        </button>
        
        <div className="h-6 w-px bg-gray-200"></div>

        <div className="flex items-center space-x-3">
          <div className="relative" ref={notificationRef}>
            <button onClick={toggleNotifications} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 relative">
              <BellIcon className="h-6 w-6" />
               {unreadCount > 0 && 
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">{unreadCount}</span>
              }
            </button>
            {isNotificationsOpen && (
                <NotificationPanel notifications={notifications} />
            )}
          </div>
          <div className="h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;