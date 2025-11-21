'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../UI/Button';
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  Building,
  Box,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'accounts', label: 'Account Manage', href: '/dashboard/accounts', icon: Users },
    { id: 'company', label: 'Company', href: '/dashboard/company', icon: Building },
    { id: 'transactions', label: 'Transactions', href: '/dashboard/transactions', icon: FileText },
    { id: 'reports', label: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
    {
      id: 'products',
      label: 'Products',
      href: '/dashboard/products/category', // This will be the main route for the dropdown
      icon: Box,
      children: [
        { id: 'category', label: 'Category', href: '/dashboard/products/category' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/dashboard/settings', // Main settings page
      icon: Settings,
      children: [
        { id: 'theme', label: 'Theme Settings', href: '/dashboard/settings/theme' }
      ]
    },
  ];

  const activeItem = navItems.find(item => item.href === pathname || item.children?.some(child => child.href === pathname));

  // Handle sidebar collapse based on hover and mobile state
  const shouldShowLabels = !isCollapsed || isHovered;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 z-50
          bg-gradient-to-b from-[color:var(--theme-primary)] to-[color:var(--theme-secondary)] text-[color:var(--theme-text)] border-r border-[color:var(--theme-border)]
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${isCollapsed ? 'w-16' : 'w-64'}
          h-full
          shadow-xl
          backdrop-blur-sm
          flex flex-col
        `}
        onMouseEnter={() => !isCollapsed && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-16 items-center border-b border-[color:var(--theme-border)] px-4 bg-[color:var(--theme-secondary)]/50 backdrop-blur-sm">
          <Link href="/dashboard" className="flex items-center gap-3 w-full">
            <div className="bg-gradient-to-r from-[color:var(--theme-primary)] to-[color:var(--theme-accent)] text-[color:var(--theme-card-bg)] w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">
              <span className="text-lg">A</span>
            </div>
            {shouldShowLabels && (
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-[color:var(--theme-text)]">AccountApp</h1>
                  <p className="text-xs text-[color:var(--theme-text)]/70 -mt-1">Dashboard</p>
                </div>
                <button
                  onClick={toggleCollapse}
                  className="p-2 rounded-lg hover:bg-[color:var(--theme-primary)]/50 text-[color:var(--theme-text)] transition-colors duration-200"
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
                    {isCollapsed ? (
                      <path d="M9 18l6-6-6-6" />
                    ) : (
                      <path d="M15 18l-6-6 6-6" />
                    )}
                  </svg>
                </button>
              </div>
            )}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem?.id === item.id;
              const isSettingsActive = item.id === 'settings' && item.children?.some(child => child.href === pathname);
              const isAnyChildActive = item.children?.some(child => child.href === pathname);

              if (item.children) {
                // Parent item with children (like Settings or Products)
                const isItemActive = activeItem?.id === item.id;
                const isAnyItemChildActive = item.children?.some(child => child.href === pathname);
                const isExpanded = item.id === 'settings' ? settingsExpanded : item.id === 'products' ? productsExpanded : false;

                return (
                  <div key={item.id}>
                    <div className="relative">
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-3 rounded-lg px-3 py-2.5
                          transition-all duration-200
                          group relative
                          ${(isItemActive || isAnyItemChildActive)
                            ? 'bg-gradient-to-r from-[color:var(--theme-primary)]/30 to-[color:var(--theme-accent)]/30 text-[color:var(--theme-text)] shadow-md font-medium'
                            : 'hover:bg-[color:var(--theme-primary)]/30 text-[color:var(--theme-text)]/70 hover:text-[color:var(--theme-text)]'}
                          ${isCollapsed && !isHovered ? 'justify-center' : 'justify-start'}
                        `}
                      >
                        <Icon className={`h-5 w-5 ${(isItemActive || isAnyItemChildActive) ? 'text-[color:var(--theme-accent)]' : 'text-[color:var(--theme-text)]/60'}`} />
                        {shouldShowLabels && (
                          <span className="font-medium transition-all duration-200 flex-1">{item.label}</span>
                        )}
                        {shouldShowLabels && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if(item.id === 'settings') {
                                setSettingsExpanded(!settingsExpanded);
                              } else if(item.id === 'products') {
                                setProductsExpanded(!productsExpanded);
                              }
                            }}
                            className="flex items-center"
                          >
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </button>
                        )}
                        {(isItemActive || isAnyItemChildActive) && !isCollapsed && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[color:var(--theme-primary)] to-[color:var(--theme-accent)] rounded-r-full"></div>
                        )}
                      </Link>
                    </div>

                    {/* Dropdown items */}
                    {(isExpanded || isAnyItemChildActive) && !isCollapsed && (
                      <div className="ml-4 mt-1 space-y-1 pl-2 border-l border-[color:var(--theme-border)]">
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.id}
                              href={child.href}
                              className={`
                                flex items-center gap-2 rounded-lg px-2 py-1.5
                                transition-all duration-200
                                ${isChildActive
                                  ? 'bg-[color:var(--theme-primary)]/40 text-[color:var(--theme-text)] font-medium'
                                  : 'hover:bg-[color:var(--theme-primary)]/20 text-[color:var(--theme-text)]/60 hover:text-[color:var(--theme-text)]'}
                              `}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--theme-text)]/40"></div>
                              <span className="text-sm">{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              } else {
                // Regular item without children
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`
                      flex items-center gap-3 rounded-lg px-3 py-2.5
                      transition-all duration-200
                      group relative
                      ${isActive
                        ? 'bg-gradient-to-r from-[color:var(--theme-primary)]/30 to-[color:var(--theme-accent)]/30 text-[color:var(--theme-text)] shadow-md font-medium'
                        : 'hover:bg-[color:var(--theme-primary)]/30 text-[color:var(--theme-text)]/70 hover:text-[color:var(--theme-text)]'}
                      ${isCollapsed && !isHovered ? 'justify-center' : 'justify-start'}
                    `}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-[color:var(--theme-accent)]' : 'text-[color:var(--theme-text)]/60'}`} />
                    {shouldShowLabels && (
                      <span className="font-medium transition-all duration-200">{item.label}</span>
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[color:var(--theme-primary)] to-[color:var(--theme-accent)] rounded-r-full"></div>
                    )}
                  </Link>
                );
              }
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[color:var(--theme-border)] bg-[color:var(--theme-secondary)]/30 backdrop-blur-sm">
          {shouldShowLabels ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[color:var(--theme-primary)]/30 to-[color:var(--theme-accent)]/30 flex items-center justify-center text-[color:var(--theme-text)] font-bold border border-[color:var(--theme-border)]">
                  <span className="text-sm">U</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[color:var(--theme-background)]"></span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-[color:var(--theme-text)]">User Name</p>
                <p className="text-xs text-[color:var(--theme-text)]/70 truncate">user@example.com</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[color:var(--theme-primary)]/30 to-[color:var(--theme-accent)]/30 flex items-center justify-center text-[color:var(--theme-text)] font-bold border border-[color:var(--theme-border)]">
                  <span className="text-xs">U</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[color:var(--theme-background)]"></span>
              </div>
            </div>
          )}
        </div>

        <div className={`px-4 py-3 text-xs text-center text-[color:var(--theme-text)]/70 ${shouldShowLabels ? 'block' : 'hidden'}`}>
          <p>© {new Date().getFullYear()} AccountApp</p>
          <p className="mt-1">Secure & Private</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;