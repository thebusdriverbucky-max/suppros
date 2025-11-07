import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { mockDashboardMetrics } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, ShoppingCart, Package, TrendingUp } from 'lucide-react';

const SalesOverview: React.FC = () => {
  const { totalRevenue, totalOrders, revenueTrend, salesByCategory } = mockDashboardMetrics;

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  const stats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: 'text-primary',
      bgColor: 'bg-secondary/20'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'text-info',
      bgColor: 'bg-info/10'
    },
    {
      title: 'Products',
      value: '12',
      icon: Package,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Avg Order Value',
      value: formatCurrency(45.67),
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sales Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor your supplement sales performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-full`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--chart-1)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByCategory}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), 'Sales']} />
                <Bar dataKey="sales" fill="var(--chart-1)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Supplements */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Supplements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDashboardMetrics.topSupplements.map((supplement, index) => (
              <div key={supplement.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{supplement.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {supplement.category.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(supplement.revenue)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {supplement.sales} units
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOverview;