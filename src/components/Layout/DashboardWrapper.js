'use client';

import { AppCurrencyProvider } from '@/contexts/AppCurrencyContext';

export default function DashboardWrapper({ children }) {
  return (
    <AppCurrencyProvider>
      {children}
    </AppCurrencyProvider>
  );
}