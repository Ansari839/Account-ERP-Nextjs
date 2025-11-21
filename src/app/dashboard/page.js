'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Cards } from '@/components/dashboard/Cards';
import { DashboardCharts } from '@/components/dashboard/Charts';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your accounts today.
          </p>
        </div>

        <Cards />

        <DashboardCharts />

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            View Reports
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}