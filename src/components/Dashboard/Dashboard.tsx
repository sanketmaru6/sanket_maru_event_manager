import React from 'react';
import { Calendar, Users, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { mockEvents, mockGuests, mockBudgetItems } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const totalEvents = mockEvents.length;
  const upcomingEvents = mockEvents.filter(event => new Date(event.date) > new Date()).length;
  const totalGuests = mockGuests.length;
  const confirmedGuests = mockGuests.filter(guest => guest.status === 'confirmed').length;
  const totalBudget = mockEvents.reduce((sum, event) => sum + event.budget, 0);
  const totalExpenses = mockEvents.reduce((sum, event) => sum + event.expenses, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  const stats = [
    {
      title: 'Total Events',
      value: totalEvents,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      icon: Clock,
      color: 'bg-purple-500',
      change: '+8%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Total Guests',
      value: totalGuests,
      icon: Users,
      color: 'bg-emerald-500',
      change: '+24%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Confirmed Guests',
      value: confirmedGuests,
      icon: CheckCircle,
      color: 'bg-orange-500',
      change: '+15%',
      changeColor: 'text-green-600'
    }
  ];

  const recentEvents = mockEvents.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className={`text-sm font-medium ${stat.changeColor}`}>{stat.change}</span>
                    <span className="text-sm text-gray-600 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Total Budget</span>
                <span className="text-sm font-bold text-gray-900">{formatCurrency(totalBudget)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Total Expenses</span>
                <span className="text-sm font-bold text-gray-900">{formatCurrency(totalExpenses)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full" 
                  style={{ width: `${(totalExpenses / totalBudget) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Remaining</span>
                <span className="text-sm font-bold text-green-600">
                  {formatCurrency(totalBudget - totalExpenses)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    event.status === 'confirmed' ? 'bg-green-500' :
                    event.status === 'planning' ? 'bg-yellow-500' :
                    event.status === 'in-progress' ? 'bg-blue-500' :
                    event.status === 'completed' ? 'bg-gray-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  event.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                  event.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  event.status === 'completed' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'
                }`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="font-medium text-gray-900">Create New Event</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-6 w-6 text-purple-600" />
            <span className="font-medium text-gray-900">Add Guests</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <DollarSign className="h-6 w-6 text-emerald-600" />
            <span className="font-medium text-gray-900">Update Budget</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;