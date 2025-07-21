import React from 'react';
import { Calendar, Users, DollarSign, Package, Clock, BarChart3, Plus } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'guests', label: 'Guests', icon: Users },
    { id: 'budget', label: 'Budget', icon: DollarSign },
    { id: 'resources', label: 'Resources', icon: Package },
    { id: 'schedule', label: 'Schedule', icon: Clock },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-orange-600" />
          <h1 className="text-xl font-bold text-gray-900">शुभ Events</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">Indian Event Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => onViewChange('create-event')}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">New Event</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;