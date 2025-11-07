import type { Product, Sale, CategoryType, DashboardMetrics, RevenueTrend, SalesByCategory, TopSupplement, StockLevel, Order, OrderItem } from '../types';
import { Category } from '../types';

// Mock Products Data
export const mockProducts: Product[] = [
  // Vitamins
  {
    id: 'vit-001',
    name: 'Vitamin D3 1000 IU',
    category: Category.VITAMINS,
    price: 15.99,
    stock: 150,
    sales: 320,
    description: 'High potency vitamin D supplement for bone health',
  },
  {
    id: 'vit-002',
    name: 'B-Complex Vitamins',
    category: Category.VITAMINS,
    price: 22.50,
    stock: 200,
    sales: 280,
    description: 'Complete B-vitamin complex for energy and metabolism',
  },
  {
    id: 'vit-003',
    name: 'Vitamin C 1000mg',
    category: Category.VITAMINS,
    price: 12.99,
    stock: 300,
    sales: 450,
    description: 'Immune system support with antioxidant properties',
  },
  {
    id: 'vit-004',
    name: 'Multivitamin for Men',
    category: Category.VITAMINS,
    price: 29.99,
    stock: 120,
    sales: 190,
    description: 'Comprehensive daily multivitamin for men 50+',
  },

  // Minerals
  {
    id: 'min-001',
    name: 'Magnesium Glycinate',
    category: Category.MINERALS,
    price: 18.50,
    stock: 180,
    sales: 260,
    description: 'Highly absorbable magnesium for muscle relaxation',
  },
  {
    id: 'min-002',
    name: 'Calcium + Vitamin D',
    category: Category.MINERALS,
    price: 16.99,
    stock: 250,
    sales: 340,
    description: 'Bone health formula with calcium and vitamin D',
  },
  {
    id: 'min-003',
    name: 'Iron Bisglycinate',
    category: Category.MINERALS,
    price: 14.99,
    stock: 90,
    sales: 120,
    description: 'Gentle iron supplement for optimal absorption',
  },

  // Proteins
  {
    id: 'pro-001',
    name: 'Whey Protein Isolate',
    category: Category.PROTEINS,
    price: 49.99,
    stock: 80,
    sales: 180,
    description: 'Premium whey protein isolate for muscle recovery',
  },
  {
    id: 'pro-002',
    name: 'Plant-Based Protein',
    category: Category.PROTEINS,
    price: 39.99,
    stock: 150,
    sales: 240,
    description: 'Complete plant protein from pea, rice, and hemp',
  },
  {
    id: 'pro-003',
    name: 'Collagen Peptides',
    category: Category.PROTEINS,
    price: 34.99,
    stock: 200,
    sales: 310,
    description: 'Hydrolyzed collagen for skin, hair, and joint health',
  },

  // Herbal Supplements
  {
    id: 'herb-001',
    name: 'Ashwagandha Root Extract',
    category: Category.HERBAL_SUPPLEMENTS,
    price: 24.99,
    stock: 160,
    sales: 220,
    description: 'Adaptogenic herb for stress and cortisol management',
  },
  {
    id: 'herb-002',
    name: 'Turmeric Curcumin',
    category: Category.HERBAL_SUPPLEMENTS,
    price: 19.99,
    stock: 220,
    sales: 380,
    description: 'Anti-inflammatory with enhanced bioavailability',
  },
  {
    id: 'herb-003',
    name: 'Omega-3 Fish Oil',
    category: Category.HERBAL_SUPPLEMENTS,
    price: 26.99,
    stock: 140,
    sales: 290,
    description: 'Heart and brain health support with EPA/DHA',
  },
];

// Generate Mock Sales Data for Last 12 Months
const generateSalesData = (): Sale[] => {
  const sales: Sale[] = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);

    // Generate 50-100 sales per month for each product
    mockProducts.forEach((product) => {
      const salesCount = Math.floor(Math.random() * 50) + 20; // 20-70 sales per product per month

      for (let j = 0; j < salesCount; j++) {
        const saleDate = new Date(monthDate);
        saleDate.setDate(Math.floor(Math.random() * 28) + 1); // Random day in month

        const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 items per sale

        sales.push({
          id: `sale-${product.id}-${i}-${j}`,
          productId: product.id,
          quantity,
          revenue: product.price * quantity,
          date: saleDate,
        });
      }
    });
  }

  return sales.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const mockSales: Sale[] = generateSalesData();

// Calculate Dashboard Metrics
export const calculateDashboardMetrics = (): DashboardMetrics => {
  const now = new Date();
  const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const recentSales = mockSales.filter(sale => sale.date >= lastYear);

  // Total revenue from recent sales
  const totalRevenue = recentSales.reduce((sum, sale) => sum + sale.revenue, 0);

  // Total orders (each sale is an order)
  const totalOrders = recentSales.length;

  // Average order value
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Revenue trend by month
  const revenueTrend: RevenueTrend[] = [];
  for (let i = 11; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const monthSales = recentSales.filter(sale =>
      sale.date.getMonth() === monthDate.getMonth() &&
      sale.date.getFullYear() === monthDate.getFullYear()
    );
    const monthRevenue = monthSales.reduce((sum, sale) => sum + sale.revenue, 0);

    revenueTrend.push({
      month: monthName,
      value: monthRevenue,
    });
  }

  // Sales by category
  const categorySales: Record<CategoryType, number> = {
    [Category.VITAMINS]: 0,
    [Category.MINERALS]: 0,
    [Category.PROTEINS]: 0,
    [Category.HERBAL_SUPPLEMENTS]: 0,
  };

  recentSales.forEach(sale => {
    const product = mockProducts.find(p => p.id === sale.productId);
    if (product) {
      categorySales[product.category] += sale.revenue;
    }
  });

  const salesByCategory: SalesByCategory[] = Object.entries(categorySales).map(([category, sales]) => ({
    category: category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    sales,
    percentage: totalRevenue > 0 ? (sales / totalRevenue) * 100 : 0,
  }));

  // Top supplements by sales
  const productSalesMap: { [productId: string]: number } = {};
  recentSales.forEach(sale => {
    productSalesMap[sale.productId] = (productSalesMap[sale.productId] || 0) + sale.revenue;
  });

  const topSupplements: TopSupplement[] = Object.entries(productSalesMap)
    .map(([productId, revenue]) => {
      const product = mockProducts.find(p => p.id === productId)!;
      return {
        id: product.id,
        name: product.name,
        category: product.category,
        sales: product.sales,
        revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Stock levels
  const stockLevels: StockLevel[] = mockProducts.map(product => {
    const minStock = 50;
    const maxStock = 300;
    let status: 'low' | 'medium' | 'high';

    if (product.stock < minStock) {
      status = 'low';
    } else if (product.stock < maxStock * 0.7) {
      status = 'medium';
    } else {
      status = 'high';
    }

    return {
      productId: product.id,
      productName: product.name,
      currentStock: product.stock,
      minStock,
      maxStock,
      status,
    };
  });

  return {
    totalRevenue,
    totalOrders,
    totalProducts: mockProducts.length,
    averageOrderValue,
    topSupplements,
    revenueTrend,
    salesByCategory,
    stockLevels,
  };
};

// Mock Orders Data
const generateMockOrders = (): Order[] => {
  const orders: Order[] = [];
  const now = new Date();

  // Customer data
  const customers = [
    { id: 'cus-001', name: 'John Smith', email: 'john.smith@email.com' },
    { id: 'cus-002', name: 'Sarah Johnson', email: 'sarah.j@email.com' },
    { id: 'cus-003', name: 'Mike Davis', email: 'mike.davis@email.com' },
    { id: 'cus-004', name: 'Emily Chen', email: 'emily.chen@email.com' },
    { id: 'cus-005', name: 'David Wilson', email: 'david.wilson@email.com' },
    { id: 'cus-006', name: 'Lisa Brown', email: 'lisa.brown@email.com' },
    { id: 'cus-007', name: 'Alex Rodriguez', email: 'alex.rodriguez@email.com' },
    { id: 'cus-008', name: 'Maria Garcia', email: 'maria.garcia@email.com' },
  ];

  const addresses = [
    '123 Main St, New York, NY 10001',
    '456 Oak Ave, Los Angeles, CA 90210',
    '789 Pine Rd, Chicago, IL 60601',
    '321 Elm St, Houston, TX 77001',
    '654 Maple Dr, Phoenix, AZ 85001',
    '987 Cedar Ln, Philadelphia, PA 19101',
    '147 Birch Ave, San Antonio, TX 78201',
    '258 Spruce St, San Diego, CA 92101',
  ];

  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  for (let i = 0; i < 50; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const orderDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date within last 30 days

    // Generate 1-5 items per order
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const items: OrderItem[] = [];
    let totalAmount = 0;

    for (let j = 0; j < itemCount; j++) {
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const total = product.price * quantity;

      items.push({
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.price,
        total,
      });

      totalAmount += total;
    }

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const address = addresses[Math.floor(Math.random() * addresses.length)];

    orders.push({
      id: `ORD-${String(i + 1).padStart(4, '0')}`,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      items,
      totalAmount,
      status,
      date: orderDate,
      shippingAddress: address,
    });
  }

  return orders.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const mockOrders: Order[] = generateMockOrders();
export const mockDashboardMetrics: DashboardMetrics = calculateDashboardMetrics();