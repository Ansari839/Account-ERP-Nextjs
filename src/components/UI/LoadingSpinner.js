import React from 'react';
import { cn } from '@/lib/utils';
import { DollarSign, TrendingUp, PieChart, BarChart3 } from 'lucide-react';

const LoadingSpinner = ({
  message = "Loading your Accounts...",
  className = "",
  size = "medium",
  showBackgroundChart = false
}) => {
  // Define sizes for the spinner
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[200px]", className)}>
      {/* Card-like container */}
      <div className="bg-[color:var(--theme-card-bg)] border border-[color:var(--theme-border)] rounded-xl p-8 shadow-sm flex flex-col items-center">
        {/* Loading animation */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Background subtle chart elements */}
          {showBackgroundChart && (
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              {/* Mini bar chart in background */}
              <div className="flex items-end h-8 space-x-1">
                {[20, 40, 60, 30, 50, 45].map((height, index) => (
                  <div
                    key={index}
                    className="bg-[color:var(--theme-primary)]/40 rounded-t-sm animate-pulse"
                    style={{
                      width: '6px',
                      height: `${height}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Main spinner - animated finance-related icon */}
          <div className="relative z-10 flex items-center justify-center">
            <div className={`animate-spin-slow ${spinnerSize}`}>
              <DollarSign className="w-full h-full text-[color:var(--theme-primary)]" />
            </div>
          </div>

          {/* Additional rotating elements for visual interest */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[color:var(--theme-primary)]/20 animate-spin-slow"
               style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-[color:var(--theme-secondary)]/20 animate-spin"
               style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        </div>

        {/* Loading text */}
        <p className="text-lg font-bold text-[color:var(--theme-text)] text-center">
          {message}
        </p>

        {/* Subtle additional text */}
        <p className="text-sm text-[color:var(--theme-text)]/60 mt-2 text-center">
          Please wait while we fetch your ledger data
        </p>

        {/* Subtle animated chart elements */}
        <div className="mt-6 flex space-x-4 opacity-60">
          <div className="animate-pulse">
            <TrendingUp className="h-5 w-5 text-[color:var(--theme-secondary)]" />
          </div>
          <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>
            <BarChart3 className="h-5 w-5 text-[color:var(--theme-primary)]" />
          </div>
          <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>
            <PieChart className="h-5 w-5 text-[color:var(--theme-accent)]" />
          </div>
        </div>
      </div>

      {/* Animated background elements for accounting theme */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[color:var(--theme-primary)]/10 to-[color:var(--theme-secondary)]/10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add custom animation to global styles
const addCustomStyles = () => {
  if (typeof document !== 'undefined') {
    const styleId = 'loading-spinner-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            transform: translate(20px, 20px) rotate(90deg);
          }
          50% {
            transform: translate(0, 40px) rotate(180deg);
            opacity: 0.15;
          }
          75% {
            transform: translate(-20px, 20px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
            opacity: 0.1;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
};

// Execute the function to add styles
addCustomStyles();

export default LoadingSpinner;