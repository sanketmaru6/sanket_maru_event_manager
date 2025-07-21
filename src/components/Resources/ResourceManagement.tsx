import React, { useState } from 'react';
import { Package, Plus, Search, Filter, MapPin, Phone, CheckCircle, Clock, XCircle } from 'lucide-react';
import { mockResources, mockEvents } from '../../data/mockData';

const ResourceManagement: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('1');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const resources = mockResources.filter(resource => resource.eventId === selectedEventId);
  const filteredResources = resources.filter(resource => {
    const typeMatch = filterType === 'all' || resource.type === filterType;
    const statusMatch = filterStatus === 'all' || resource.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'booked': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'available': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'unavailable': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'venue': return 'bg-purple-100 text-purple-800';
      case 'catering': return 'bg-orange-100 text-orange-800';
      case 'equipment': return 'bg-blue-100 text-blue-800';
      case 'entertainment': return 'bg-pink-100 text-pink-800';
      case 'decoration': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: resources.length,
    booked: resources.filter(r => r.status === 'booked').length,
    available: resources.filter(r => r.status === 'available').length,
    unavailable: resources.filter(r => r.status === 'unavailable').length,
  };

  const totalCost = resources.filter(r => r.status === 'booked').reduce((sum, r) => sum + r.cost, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
          <p className="text-gray-600">Manage venues, equipment, and vendors</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {mockEvents.map(event => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Resource</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Resources</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.booked}</p>
              <p className="text-sm text-gray-600">Booked</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.available}</p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <XCircle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.unavailable}</p>
              <p className="text-sm text-gray-600">Unavailable</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-emerald-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCost)}</p>
              <p className="text-sm text-gray-600">Total Cost</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="venue">Venue</option>
              <option value="catering">Catering</option>
              <option value="equipment">Equipment</option>
              <option value="entertainment">Entertainment</option>
              <option value="decoration">Decoration</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.name}</h3>
                  <div className="flex space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(resource.status)}`}>
                      {resource.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(resource.cost)}</p>
                </div>
              </div>

              <div className="space-y-3">
                {resource.contact && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{resource.contact}</span>
                  </div>
                )}
                {resource.notes && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-600">{resource.notes}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(resource.status)}
                  <span className="text-sm font-medium text-gray-600">{resource.status}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit
                  </button>
                  {resource.status === 'available' && (
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Book
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Start adding resources for your event.</p>
        </div>
      )}
    </div>
  );
};

export default ResourceManagement;