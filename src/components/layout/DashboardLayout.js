'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkIfMobile();

    // Add resize listener
    const handleResize = () => checkIfMobile();
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      // On mobile, open/close sidebar completely
      setSidebarOpen(!sidebarOpen);
    } else {
      // On desktop, just toggle collapsed state
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isCollapsed={sidebarCollapsed}
        toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${!isMobile && sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/20">
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;