import React from 'react';
import Input from '../UI/Input';
import { Button } from '../UI/Button';
import useTheme from '../../hooks/useTheme';

const Header = ({ sidebarCollapsed, toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-background/80 backdrop-blur-md px-4 md:px-6 shadow-sm">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-accent text-foreground md:hidden"
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
      </button>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-8 lg:gap-10">
        <div className="hidden md:block relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-muted-foreground"
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
          </div>
          <Input
            type="search"
            placeholder="Search accounts, transactions, reports..."
            className="pl-10 pr-4 bg-background/70 h-10 rounded-xl shadow-sm w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative rounded-xl p-2 hover:bg-accent/70"
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
            variant="ghost"
            size="icon"
            className="relative rounded-xl p-2 hover:bg-accent/70"
          >
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
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-background"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Button
            variant="ghost"
            className="rounded-xl p-2 hover:bg-accent/70 flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary/30 to-primary/20 flex items-center justify-center text-primary text-xs font-bold">
              <span className="text-sm">U</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-foreground">User Name</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;