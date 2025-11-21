'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountForm from '@/components/accounts/AccountForm';

const CreateAccountPage = () => {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await axios.post('/api/accounts', data);
      // Redirect to accounts list after successful creation
      router.push('/dashboard/accounts');
      router.refresh(); // Refresh to update any cached content
    } catch (error) {
      console.error('Error creating account:', error);
      alert(`Error creating account: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-600">Add a new account record</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <AccountForm onSubmit={handleSubmit} mode="create" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateAccountPage;