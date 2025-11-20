'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/UI/Button';
import useTheme from '@/hooks/useTheme';

const AccountManagePage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Account Management</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={toggleTheme}>
              {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-gradient-to-br from-card/50 to-card/30 border border-border p-6 shadow-lg backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <div className="mt-1">John Doe</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="mt-1">john.doe@example.com</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <div className="mt-1">(555) 123-4567</div>
              </div>
              <Button className="mt-4 w-full">Edit Information</Button>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-card/50 to-card/30 border border-border p-6 shadow-lg backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <div className="mt-1">••••••••</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Two-Factor Auth</label>
                <div className="mt-1">Disabled</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                <div className="mt-1">Today, 10:30 AM</div>
              </div>
              <Button variant="outline" className="mt-4 w-full">Change Password</Button>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-card/50 to-card/30 border border-border p-6 shadow-lg backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Currency</label>
                <div className="mt-1">USD ($)</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Language</label>
                <div className="mt-1">English</div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                <div className="mt-1">UTC-05:00 (Eastern Time)</div>
              </div>
              <Button variant="outline" className="mt-4 w-full">Update Preferences</Button>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-card/50 to-card/30 border border-border p-6 shadow-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Export Data</h4>
              <p className="text-sm text-muted-foreground mb-3">Download a copy of your account data</p>
              <Button variant="outline" className="w-full">Export</Button>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Close Account</h4>
              <p className="text-sm text-muted-foreground mb-3">Permanently delete your account</p>
              <Button variant="destructive" className="w-full">Close Account</Button>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Deactivate Account</h4>
              <p className="text-sm text-muted-foreground mb-3">Temporarily deactivate your account</p>
              <Button variant="secondary" className="w-full">Deactivate</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountManagePage;