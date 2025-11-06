import type { Product, Sale, CategoryType, DashboardMetrics, RevenueTrend, SalesByCategory, TopSupplement, StockLevel } from '../types';
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

export const mockDashboardMetrics: DashboardMetrics = calculateDashboardMetrics();