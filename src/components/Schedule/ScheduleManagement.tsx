import React, { useState } from 'react';
import { Clock, Plus, Edit, Trash2, MapPin, User } from 'lucide-react';
import { mockScheduleItems, mockEvents } from '../../data/mockData';

const ScheduleManagement: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('1');

  const scheduleItems = mockScheduleItems.filter(item => item.eventId === selectedEventId);
  const selectedEvent = mockEvents.find(e => e.id === selectedEventId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedItems = [...scheduleItems].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
          <p className="text-gray-600">Plan and organize event timelines</p>
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
            <span>Add Schedule Item</span>
          </button>
        </div>
      </div>

      {/* Event Info */}
      {selectedEvent && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
              <p className="text-gray-600">{new Date(selectedEvent.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Event Duration</p>
              <p className="font-semibold text-gray-900">
                {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Event Timeline</h3>
        </div>
        
        <div className="p-6">
          {sortedItems.length > 0 ? (
            <div className="space-y-4">
              {sortedItems.map((item, index) => (
                <div key={item.id} className="flex">
                  {/* Timeline */}
                  <div className="flex flex-col items-center mr-6">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      item.status === 'completed' ? 'bg-green-500 border-green-500' :
                      item.status === 'in-progress' ? 'bg-blue-500 border-blue-500' :
                      'bg-white border-gray-300'
                    }`}></div>
                    {index < sortedItems.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <div className="flex space-x-1">
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <Edit className="h-4 w-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {formatTime(item.startTime)} - {formatTime(item.endTime)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({calculateDuration(item.startTime, item.endTime)})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.responsible}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No schedule items</h3>
              <p className="text-gray-600">Start adding items to your event schedule.</p>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{scheduleItems.length}</p>
              <p className="text-sm text-gray-600">Total Activities</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-green-600">
                {scheduleItems.filter(i => i.status === 'completed').length}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {scheduleItems.filter(i => i.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600">
                {scheduleItems.filter(i => i.status === 'scheduled').length}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {scheduleItems.filter(i => i.status === 'scheduled').length}
              </p>
              <p className="text-sm text-gray-600">Upcoming</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;