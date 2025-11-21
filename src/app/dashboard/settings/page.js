'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-600">Manage your application settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Customize the appearance of your application with different themes.</p>
              <Link href="/dashboard/settings/theme">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Customize Theme
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage your account information and security preferences.</p>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                disabled
              >
                Manage Account
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Configure system-level preferences and options.</p>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                disabled
              >
                Configure
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/dashboard/settings/theme">
                <Button 
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
                >
                  Change Theme
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
                disabled
              >
                Data Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;