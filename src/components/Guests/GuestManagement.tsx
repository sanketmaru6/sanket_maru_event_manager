import React, { useState } from 'react';
import { Users, Mail, Phone, Plus, Filter, Download, UserCheck, UserX, Clock } from 'lucide-react';
import { mockGuests } from '../../data/mockData';

const GuestManagement: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredGuests = mockGuests.filter(guest => {
    const statusMatch = filterStatus === 'all' || guest.status === filterStatus;
    const searchMatch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <UserCheck className="h-4 w-4 text-green-600" />;
      case 'declined': return <UserX className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: mockGuests.length,
    confirmed: mockGuests.filter(g => g.status === 'confirmed').length,
    pending: mockGuests.filter(g => g.status === 'pending').length,
    declined: mockGuests.filter(g => g.status === 'declined').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Guest Management</h2>
          <p className="text-gray-600">Manage invitations and track RSVPs</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export List</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Guest</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Guests</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <UserCheck className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              <p className="text-sm text-gray-600">Confirmed</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <UserX className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.declined}</p>
              <p className="text-sm text-gray-600">Declined</p>
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="invited">Invited (आमंत्रित)</option>
              <option value="confirmed">Confirmed</option>
              <option value="declined">Declined</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Guest</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Contact</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Food Preference</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Relation</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Side</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Invited</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {guest.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{guest.name}</p>
                        {guest.notes && <p className="text-sm text-gray-500">{guest.notes}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{guest.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{guest.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(guest.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(guest.status)}`}>
                        {guest.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{guest.dietary || 'None'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600 capitalize">{guest.relation || 'N/A'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600 capitalize">{guest.side || 'N/A'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">
                      {new Date(guest.invitedAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
                        Send Reminder
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredGuests.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No guests found</h3>
          <p className="text-gray-600">Start adding guests to your events.</p>
        </div>
      )}
    </div>
  );
};

export default GuestManagement;