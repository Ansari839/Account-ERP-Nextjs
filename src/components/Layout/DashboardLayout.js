import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkIfMobile();

    // Add resize listener
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      // On mobile, open/close sidebar completely
      setSidebarOpen(!sidebarOpen);
      // On mobile, also set collapsed state appropriately
      if (!sidebarOpen) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    } else {
      // On desktop, just toggle collapsed state
      setSidebarCollapsed(!sidebarCollapsed);
      // Ensure sidebar is open when toggling on desktop
      setSidebarOpen(true);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarCollapsed(false);
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <div className={`flex flex-col flex-1 w-full transition-all duration-300 ${sidebarOpen && !isMobile ? 'md:ml-64' : sidebarCollapsed && !isMobile ? 'md:ml-16' : 'ml-0'}`} id="main-content">
        <Header
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/20">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;