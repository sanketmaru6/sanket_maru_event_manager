import React, { useState } from 'react';
import { DollarSign, Plus, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { mockBudgetItems, mockEvents } from '../../data/mockData';

const BudgetManagement: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('1');

  const selectedEvent = mockEvents.find(e => e.id === selectedEventId);
  const budgetItems = mockBudgetItems.filter(item => item.eventId === selectedEventId);

  const totalBudgeted = budgetItems.reduce((sum, item) => sum + item.budgetedAmount, 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + item.actualAmount, 0);
  const remaining = selectedEvent ? selectedEvent.budget - totalActual : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'booked': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const categories = [...new Set(budgetItems.map(item => item.category))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Budget Management</h2>
          <p className="text-gray-600">Track expenses and manage event budgets</p>
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
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(selectedEvent?.budget || 0)}
              </p>
              <p className="text-sm text-gray-600">Total Budget</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <TrendingDown className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalActual)}</p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(remaining)}</p>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              remaining >= 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <span className={`text-sm font-bold ${
                remaining >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedEvent ? Math.round((totalActual / selectedEvent.budget) * 100) : 0}%
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{budgetItems.length}</p>
              <p className="text-sm text-gray-600">Budget Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Allocation</h3>
        <div className="space-y-4">
          {categories.map(category => {
            const categoryItems = budgetItems.filter(item => item.category === category);
            const categoryBudget = categoryItems.reduce((sum, item) => sum + item.budgetedAmount, 0);
            const categorySpent = categoryItems.reduce((sum, item) => sum + item.actualAmount, 0);
            const percentage = selectedEvent ? (categoryBudget / selectedEvent.budget) * 100 : 0;
            const spentPercentage = categoryBudget > 0 ? (categorySpent / categoryBudget) * 100 : 0;

            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{category}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-gray-600">
                      {formatCurrency(categorySpent)} / {formatCurrency(categoryBudget)}
                    </span>
                    <span className="text-gray-500">{percentage.toFixed(1)}% of total</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      spentPercentage > 100 ? 'bg-red-500' : 
                      spentPercentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Items Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Budget Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Description</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Vendor</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Budgeted</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actual</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Due Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgetItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{item.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{item.description}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{item.vendor || 'TBD'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.budgetedAmount)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${
                      item.actualAmount > item.budgetedAmount ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {formatCurrency(item.actualAmount)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">
                      {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : '-'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {budgetItems.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No budget items</h3>
          <p className="text-gray-600">Start adding budget items to track your event expenses.</p>
        </div>
      )}
    </div>
  );
};

export default BudgetManagement;