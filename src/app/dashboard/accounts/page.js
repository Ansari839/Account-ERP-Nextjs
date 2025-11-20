'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountTable from '@/components/accounts/AccountTable';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/accounts');
        setAccounts(response.data.accounts || []);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await axios.delete(`/api/accounts/${id}`);
        // Refresh the account list after successful deletion
        const response = await axios.get('/api/accounts');
        setAccounts(response.data.accounts || []);
      } catch (error) {
        console.error('Error deleting account:', error);
        alert(`Error deleting account: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  // Filter accounts based on search query
  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.headOfAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading accounts...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Accounts</h1>
            <p className="text-muted-foreground">Manage your account records</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-2 border rounded-md w-full sm:w-64"
              />
            </div>
            <Link href="/dashboard/accounts/create">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Account
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <AccountTable
            accounts={filteredAccounts}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountsPage;