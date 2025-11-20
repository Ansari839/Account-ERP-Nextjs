import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
      
      <div className="flex flex-col flex-1 w-full transition-all duration-300">
        <Header 
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;