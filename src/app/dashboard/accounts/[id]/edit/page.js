'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountForm from '@/components/accounts/AccountForm';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { Button } from '@/components/UI/Button';

const EditAccountPage = ({ params }) => {
  const { id } = React.use(params);
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get(`/api/accounts/${id}`);
        setAccountData(response.data);
      } catch (err) {
        setError('Failed to fetch account data');
        console.error('Error fetching account:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAccountData();
    }
  }, [id]); // id is now properly unwrapped with React.use(params)

  const handleSubmit = async (data) => {
    try {
      await axios.put(`/api/accounts/${id}`, data);
      console.log('Account updated successfully');
      router.push('/dashboard/accounts'); // Redirect to accounts list after successful update
      router.refresh(); // Refresh to update any cached content
    } catch (error) {
      console.error('Error updating account:', error);
      alert(`Error updating account: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading Account Details..." />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-lg text-red-500">{error}</p>
            <Button
              onClick={() => router.back()}
              className="mt-4"
            >
              Go Back
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Account</h1>
          <p className="text-gray-600">Editing account: {accountData?.name}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <AccountForm onSubmit={handleSubmit} initialData={accountData} mode="edit" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditAccountPage;