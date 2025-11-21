'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Create the context
const AppCurrencyContext = createContext();

// Default currency
const DEFAULT_CURRENCY = {
  code: 'USD',
  symbol: '$',
  name: 'US Dollar'
};

// Provider component
export const AppCurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [loading, setLoading] = useState(true);

  // Fetch company data to get currency settings
  const fetchCurrency = useCallback(async () => {
    try {
      const response = await fetch('/api/company');
      const result = await response.json();
      
      if (result.exists && result.data?.currency) {
        setCurrency(result.data.currency);
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
      // Use default currency if there's an error
      setCurrency(DEFAULT_CURRENCY);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update currency when the company data changes
  const updateCurrency = useCallback((newCurrency) => {
    setCurrency(newCurrency);
  }, []);

  // Fetch currency on initial load
  useEffect(() => {
    fetchCurrency();
  }, [fetchCurrency]);

  // Context value
  const value = {
    currency,
    loading,
    setCurrency: updateCurrency,
    formatCurrency: (amount) => {
      // Format the amount with the current currency
      if (typeof amount !== 'number') {
        amount = parseFloat(amount) || 0;
      }
      
      // Format the number with 2 decimal places and add currency symbol
      return `${currency.symbol}${amount.toFixed(2)}`;
    }
  };

  return (
    <AppCurrencyContext.Provider value={value}>
      {children}
    </AppCurrencyContext.Provider>
  );
};

// Custom hook to use the AppCurrencyContext
export const useAppCurrency = () => {
  const context = useContext(AppCurrencyContext);
  
  if (!context) {
    throw new Error('useAppCurrency must be used within an AppCurrencyProvider');
  }
  
  return context;
};