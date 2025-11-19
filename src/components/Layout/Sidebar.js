import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ collapsed = false, toggleCollapse, isOpen = false, onClose }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  // Navigation items - expandable for future features
  const navItems = [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', href: '/dashboard/transactions', icon: '💳' },
    { id: 'analytics', label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
    { id: 'budget', label: 'Budget', href: '/dashboard/budget', icon: '💰' },
  ];

  const activeItem = navItems.find(item => item.href === pathname);

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        bg-gradient-to-b from-sidebar-background to-sidebar-background/90 text-sidebar-foreground border-r border-sidebar-border
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
        md:static md:translate-x-0
        ${collapsed && !isOpen ? 'w-16' : 'w-64'}
        md:${(!collapsed || isHovered) && !isOpen ? 'w-64' : 'w-16'}
        flex flex-col h-full
        shadow-xl
        backdrop-blur-sm
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border/50 px-4 bg-sidebar/30 backdrop-blur-sm">
        <Link href="/dashboard" className={`flex items-center gap-3 ${collapsed && !isHovered ? 'justify-center' : 'justify-between'} w-full`}>
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">
            <span className="text-lg">A</span>
          </div>
          {!collapsed || isHovered ? (
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">AccountApp</h1>
                <p className="text-xs text-muted-foreground -mt-1">Dashboard</p>
              </div>
              <div className="flex items-center gap-1">
                {/* Close button for mobile */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-accent-foreground transition-colors duration-200 md:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
                <button
                  onClick={toggleCollapse}
                  className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-accent-foreground transition-colors duration-200 md:flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {collapsed || !isHovered ? (
                      <path d="M9 18l6-6-6-6" />
                    ) : (
                      <path d="M15 18l-6-6 6-6" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              {/* Close button for mobile */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-accent-foreground transition-colors duration-200 md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              <button
                onClick={toggleCollapse}
                className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-accent-foreground transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-xl px-3 py-2.5
                transition-all duration-200
                group relative
                ${activeItem?.id === item.id
                  ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-md text-primary font-medium'
                  : 'hover:bg-sidebar-accent/50 text-sidebar-foreground hover:text-sidebar-accent-foreground'}
                ${collapsed && !isHovered ? 'justify-center' : 'justify-start'}
              `}
            >
              <span className="text-lg flex items-center justify-center">
                {item.icon}
              </span>
              {(!collapsed || isHovered) && (
                <span className="font-medium transition-all duration-200">{item.label}</span>
              )}
              {activeItem?.id === item.id && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Additional navigation items for demonstration */}
        <nav className="flex flex-col gap-1 px-2 mt-2">
          {[
            { id: 'accounts', label: 'Accounts', href: '/dashboard/accounts', icon: '🏦' },
            { id: 'investments', label: 'Investments', href: '/dashboard/investments', icon: '📈' },
            { id: 'savings', label: 'Savings', href: '/dashboard/savings', icon: '💰' },
            { id: 'insurance', label: 'Insurance', href: '/dashboard/insurance', icon: '🛡️' },
            { id: 'loans', label: 'Loans', href: '/dashboard/loans', icon: '💳' },
            { id: 'reports', label: 'Reports', href: '/dashboard/reports', icon: '📊' },
            { id: 'settings', label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
          ].map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-xl px-3 py-2.5
                transition-all duration-200
                group relative
                hover:bg-sidebar-accent/50 text-sidebar-foreground hover:text-sidebar-accent-foreground
                ${collapsed && !isHovered ? 'justify-center' : 'justify-start'}
              `}
            >
              <span className="text-lg flex items-center justify-center">
                {item.icon}
              </span>
              {(!collapsed || isHovered) && (
                <span className="font-medium transition-all duration-200">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Premium upgrade section */}
        <div className={`mt-4 mx-2 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 ${collapsed && !isHovered ? 'hidden' : ''}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8c-1.8 0-3.4.8-4.5 2.1a1 1 0 0 0 0 1.4C8.6 13 10.2 14 12 14c1.8 0 3.4-.8 4.5-2.1a1 1 0 0 0 0-1.4C15.4 9 13.8 8 12 8z" />
                <path d="M12 8v1" />
                <path d="M12 13v1" />
                <path d="M12 3v1" />
                <path d="M12 20v1" />
                <path d="m17 7-1 1" />
                <path d="m7 17-1 1" />
                <path d="m17 17-1-1" />
                <path d="m7 7-1-1" />
              </svg>
            </div>
            <span className="font-medium">Premium Plan</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Upgrade to unlock advanced features</p>
          <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border/50 bg-sidebar/20 backdrop-blur-sm">
        {!collapsed || isHovered ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/30 to-primary/20 flex items-center justify-center text-primary font-bold border border-border">
                <span className="text-sm">U</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar-background"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">User Name</p>
              <p className="text-xs text-sidebar-accent-foreground truncate">user@example.com</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground mt-1">Online</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/30 to-primary/20 flex items-center justify-center text-primary font-bold border border-border">
                <span className="text-xs">U</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-sidebar-background"></span>
            </div>
          </div>
        )}
      </div>

      <div className={`px-4 py-3 text-xs text-center text-sidebar-accent-foreground/70 ${collapsed && !isHovered ? 'hidden' : 'block'}`}>
        <p>© {new Date().getFullYear()} AccountApp</p>
        <p className="mt-1">Secure & Private</p>
      </div>
    </aside>
  );
};

export default Sidebar;