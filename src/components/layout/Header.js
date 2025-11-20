'use client';

import React, { useState } from 'react';
import { Button } from '../UI/Button';
import useTheme from '../../hooks/useTheme';

const Header = ({ sidebarOpen, toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="md:hidden"
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
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      <div className="flex w-full items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="ml-0 md:ml-4 flex-1 max-w-md">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border bg-background pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="relative rounded-xl"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </Button>

          <Button
            variant="outline"
            className="rounded-xl flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary/30 to-primary/20 flex items-center justify-center text-primary text-xs font-bold">
              <span className="text-xs">U</span>
            </div>
            User
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;