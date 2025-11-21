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
  BarChart3
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'accounts', label: 'Account Manage', href: '/dashboard/accounts', icon: Users },
    { id: 'transactions', label: 'Transactions', href: '/dashboard/transactions', icon: FileText },
    { id: 'reports', label: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const activeItem = navItems.find(item => item.href === pathname);

  // Handle sidebar collapse based on hover and mobile state
  const shouldShowLabels = !isCollapsed || isHovered;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 z-50
          bg-gradient-to-b from-slate-900 to-slate-800 text-sidebar-foreground border-r border-slate-700
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
        <div className="flex h-16 items-center border-b border-slate-700 px-4 bg-slate-800/50 backdrop-blur-sm">
          <Link href="/dashboard" className="flex items-center gap-3 w-full">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">
              <span className="text-lg">A</span>
            </div>
            {shouldShowLabels && (
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-white">AccountApp</h1>
                  <p className="text-xs text-slate-400 -mt-1">Dashboard</p>
                </div>
                <button
                  onClick={toggleCollapse}
                  className="p-2 rounded-lg hover:bg-slate-700 text-white transition-colors duration-200"
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
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2.5
                    transition-all duration-200
                    group relative
                    ${isActive
                      ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white shadow-md font-medium'
                      : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'}
                    ${isCollapsed && !isHovered ? 'justify-center' : 'justify-start'}
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-300' : 'text-slate-400'}`} />
                  {shouldShowLabels && (
                    <span className="font-medium transition-all duration-200">{item.label}</span>
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-800/30 backdrop-blur-sm">
          {shouldShowLabels ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-white font-bold border border-slate-600">
                  <span className="text-sm">U</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-white">User Name</p>
                <p className="text-xs text-slate-400 truncate">user@example.com</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-white font-bold border border-slate-600">
                  <span className="text-xs">U</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-slate-900"></span>
              </div>
            </div>
          )}
        </div>

        <div className={`px-4 py-3 text-xs text-center text-slate-500 ${shouldShowLabels ? 'block' : 'hidden'}`}>
          <p>© {new Date().getFullYear()} AccountApp</p>
          <p className="mt-1">Secure & Private</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;