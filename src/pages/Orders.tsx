import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { mockOrders } from '../data/mockData';
import type { Order } from '../types';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const Orders: React.FC = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'processing': return 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusStats = () => {
    const stats = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    mockOrders.forEach(order => {
      stats[order.status]++;
    });

    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left">Orders</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-center sm:text-left">Manage and track customer orders</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockOrders.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Processing</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.processing}</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Shipped</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.shipped}</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivered</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.delivered}</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4 flex-1 justify-center sm:justify-start">
                      <div className="text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                          {order.id}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {order.customerName} • {order.customerEmail}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 min-w-0">
                      <div className="text-center sm:text-right">
                        <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(order.totalAmount)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(order.date)}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize self-center sm:self-auto ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="p-1 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded self-center sm:self-auto"
                      >
                        {expandedOrders.has(order.id) ? (
                          <ChevronUp className="h-4 w-4 text-black dark:text-white" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-black dark:text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedOrders.has(order.id) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-center sm:text-left">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded space-y-2 sm:space-y-0">
                                <div className="text-center sm:text-left">
                                  <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{item.productName}</p>
                                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Quantity: {item.quantity} × {formatCurrency(item.price)}
                                  </p>
                                </div>
                                <p className="font-semibold text-gray-900 dark:text-white text-center sm:text-right text-sm sm:text-base">
                                  {formatCurrency(item.total)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-0">
                          <div className="text-center sm:text-left">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Shipping Address</h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{order.shippingAddress}</p>
                          </div>
                          <div className="text-center sm:text-right">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(order.totalAmount)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;