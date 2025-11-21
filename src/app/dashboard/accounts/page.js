'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountTable from '@/components/accounts/AccountTable';
import AccountForm from '@/components/accounts/AccountForm';
import { Button } from '@/components/UI/Button';
import { Search, Plus } from 'lucide-react';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

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

  const handleCreateAccount = async (data) => {
    try {
      await axios.post('/api/accounts', data);
      // Refresh the account list after successful creation
      const response = await axios.get('/api/accounts');
      setAccounts(response.data.accounts || []);
      setShowForm(false); // Return to list view
    } catch (error) {
      console.error('Error creating account:', error);
      alert(`Error creating account: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleUpdateAccount = async (data) => {
    try {
      await axios.put(`/api/accounts/${editingAccount._id}`, data);
      // Refresh the account list after successful update
      const response = await axios.get('/api/accounts');
      setAccounts(response.data.accounts || []);
      setShowForm(false); // Return to list view
      setEditingAccount(null); // Clear editing state
    } catch (error) {
      console.error('Error updating account:', error);
      alert(`Error updating account: ${error.response?.data?.message || error.message}`);
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
            <p className="text-gray-600">Manage your account records</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* <Button
              onClick={() => {
                setEditingAccount(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              Create Account
            </Button> */}
          </div>
        </div>

        {/* Card container that shows either the form or the table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {showForm ? (
            // Show Form view
            <div className="w-full">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingAccount ? 'Edit Account' : 'Create New Account'}
                </h2>
                <Button
                  onClick={() => setShowForm(false)} // Go back to list view
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Go to Account List
                </Button>
              </div>
              <AccountForm
                onSubmit={editingAccount ? handleUpdateAccount : handleCreateAccount}
                initialData={editingAccount}
                mode={editingAccount ? 'edit' : 'create'}
              />
            </div>
          ) : (
            // Show Table view
            <div className="w-full">
              <AccountTable
                accounts={filteredAccounts}
                onDelete={handleDelete}
                onEdit={setEditingAccount}
                setShowForm={setShowForm}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountsPage;