import React, { useState } from 'react';
import { Calendar, Users, DollarSign, MapPin, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { mockEvents } from '../../data/mockData';
import { Event } from '../../types';

interface EventListProps {
  onViewEvent: (event: Event) => void;
  onEditEvent: (event: Event) => void;
  onCreateEvent: () => void;
}

const EventList: React.FC<EventListProps> = ({ onViewEvent, onEditEvent, onCreateEvent }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = mockEvents.filter(event => {
    const statusMatch = filterStatus === 'all' || event.status === filterStatus;
    const typeMatch = filterType === 'all' || event.type === filterType;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'wedding': return 'bg-red-100 text-red-800';
      case 'engagement': return 'bg-pink-100 text-pink-800';
      case 'mehendi': return 'bg-green-100 text-green-800';
      case 'haldi': return 'bg-yellow-100 text-yellow-800';
      case 'sangam': return 'bg-purple-100 text-purple-800';
      case 'reception': return 'bg-indigo-100 text-indigo-800';
      case 'conference': return 'bg-blue-100 text-blue-800';
      case 'corporate': return 'bg-indigo-100 text-indigo-800';
      case 'birthday': return 'bg-orange-100 text-orange-800';
      case 'festival': return 'bg-orange-100 text-orange-800';
      case 'religious': return 'bg-amber-100 text-amber-800';
      case 'cultural': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-900">Events</h2>
          <p className="text-gray-600">Manage and track all your events</p>
        </div>
        <button
          onClick={onCreateEvent}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="planning">Planning</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="wedding">Wedding (विवाह)</option>
              <option value="engagement">Engagement (सगाई)</option>
              <option value="mehendi">Mehendi (मेहंदी)</option>
              <option value="haldi">Haldi (हल्दी)</option>
              <option value="sangam">Sangam (संगम)</option>
              <option value="reception">Reception (रिसेप्शन)</option>
              <option value="conference">Conference</option>
              <option value="corporate">Corporate</option>
              <option value="birthday">Birthday</option>
              <option value="festival">Festival (त्योहार)</option>
              <option value="religious">Religious (धार्मिक)</option>
              <option value="cultural">Cultural (सांस्कृतिक)</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                </div>
                <div className="relative">
                  <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()} • {event.startTime} - {event.endTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{event.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {event.confirmedGuests}/{event.guestCount} confirmed
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatCurrency(event.expenses)} / {formatCurrency(event.budget)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => onViewEvent(event)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onEditEvent(event)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Edit Event"
                  >
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first event.</p>
          <button
            onClick={onCreateEvent}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Your First Event
          </button>
        </div>
      )}
    </div>
  );
};

export default EventList;