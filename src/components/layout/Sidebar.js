import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../UI/Button';

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: '📊' },
    { id: 'account', label: 'Account Manage', href: '/dashboard/accounts', icon: '👤' },
  ];

  const activeItem = navItems.find(item => item.href === pathname);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          bg-gradient-to-b from-sidebar-background to-sidebar-background/90 text-sidebar-foreground border-r border-sidebar-border
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
          md:static md:translate-x-0
          ${isCollapsed && !isOpen ? 'w-16' : 'w-64'}
          md:${(!isCollapsed || isHovered) && !isOpen ? 'w-64' : 'w-16'}
          flex flex-col h-full
          shadow-xl
          backdrop-blur-sm
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-16 items-center border-b border-sidebar-border/50 px-4 bg-sidebar/30 backdrop-blur-sm">
          <Link href="/dashboard" className={`flex items-center gap-3 ${isCollapsed && !isHovered ? 'justify-center' : 'justify-between'} w-full`}>
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">
              <span className="text-lg">A</span>
            </div>
            {!isCollapsed || isHovered ? (
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">AccountApp</h1>
                  <p className="text-xs text-muted-foreground -mt-1">Dashboard</p>
                </div>
                <div className="flex items-center gap-1">
                  {/* Close button for mobile */}
                  <button
                    onClick={toggleSidebar}
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
                      {isCollapsed || !isHovered ? (
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
                  onClick={toggleSidebar}
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
                  ${isCollapsed && !isHovered ? 'justify-center' : 'justify-start'}
                `}
              >
                <span className="text-lg flex items-center justify-center">
                  {item.icon}
                </span>
                {(!isCollapsed || isHovered) && (
                  <span className="font-medium transition-all duration-200">{item.label}</span>
                )}
                {activeItem?.id === item.id && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border/50 bg-sidebar/20 backdrop-blur-sm">
          {!isCollapsed || isHovered ? (
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

        <div className={`px-4 py-3 text-xs text-center text-sidebar-accent-foreground/70 ${isCollapsed && !isHovered ? 'hidden' : 'block'}`}>
          <p>© {new Date().getFullYear()} AccountApp</p>
          <p className="mt-1">Secure & Private</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;