// Product and Category Types
export const Category = {
  VITAMINS: 'vitamins',
  MINERALS: 'minerals',
  PROTEINS: 'proteins',
  HERBAL_SUPPLEMENTS: 'herbal_supplements',
} as const;

export type CategoryType = typeof Category[keyof typeof Category];

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  stock: number;
  sales: number;
  description?: string;
  imageUrl?: string;
}

// Sale Types
export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  revenue: number;
  date: Date;
  customerId?: string;
}

// Dashboard Metrics Types
export interface RevenueTrend {
  month: string;
  value: number;
}

export interface SalesByCategory {
  category: string;
  sales: number;
  percentage: number;
}

export interface TopSupplement {
  id: string;
  name: string;
  category: CategoryType;
  sales: number;
  revenue: number;
}

export interface StockLevel {
  productId: string;
  productName: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  status: 'low' | 'medium' | 'high';
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageOrderValue: number;
  topSupplements: TopSupplement[];
  revenueTrend: RevenueTrend[];
  salesByCategory: SalesByCategory[];
  stockLevels: StockLevel[];
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Chart Data Types for Recharts
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  [key: string]: any;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface ProductFormData {
  name: string;
  category: CategoryType;
  price: number;
  stock: number;
  description?: string;
}

export interface FilterOptions {
  category?: CategoryType;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';