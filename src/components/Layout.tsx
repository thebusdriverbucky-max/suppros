import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, ShoppingCart, Package, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    name: 'Sales Overview',
    href: '/',
    icon: BarChart3,
    current: true,
  },
  {
    name: 'Products Analytics',
    href: '/products',
    icon: Package,
    current: false,
  },
  {
    name: 'Orders',
    href: '/orders',
    icon: ShoppingCart,
    current: false,
  },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background w-full">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Admin Panel</h1>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-200 hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl transition-all duration-200 hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3 pl-2 border-l border-border">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center shadow-sm">
                <span className="text-sm font-semibold text-primary-foreground">A</span>
              </div>
              <span className="hidden sm:block text-sm font-semibold text-foreground">
                Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="lg:flex pt-16 min-h-screen w-full">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/75 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className={`fixed inset-y-0 left-0 top-16 z-40 w-64 bg-card border-r border-border transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col lg:flex-shrink-0`}>
          <nav className="mt-6 px-3 flex-1">
            <ul className="space-y-1.5">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`group flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                          isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                        }`}
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="lg:flex-1 bg-background min-h-screen w-full">
          <main className="p-4 sm:p-6 lg:p-8 min-h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}