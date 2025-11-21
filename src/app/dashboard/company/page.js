'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CompanyForm from '@/components/company/CompanyForm';

const CompanyPage = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch company data on component mount
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('/api/company');
        if (response.ok) {
          const company = await response.json();
          setCompanyData(company);
        } else {
          console.error('Failed to fetch company data');
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Information</h1>
          <p className="text-gray-600">
            Manage your company details and settings
          </p>
        </div>

        {/* Card container that matches the Accounts page design */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Company Information</h2>
              <p className="text-gray-600">
                {companyData
                  ? 'Update your company information'
                  : 'Set up your company information for the first time'}
              </p>
            </div>
            <CompanyForm initialData={companyData} loading={loading} />
          </div>
        </div>

        {/* Placeholder sections for future modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fiscal Year Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Fiscal Year</h3>
            </div>
            <p className="text-sm text-gray-500">Configure your fiscal year settings.</p>
            <div className="mt-4 text-sm text-gray-500 italic">Coming Soon</div>
          </div>

          {/* Product Units Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h1l6-6h4l6 6h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2"></path>
                  <path d="M7 7v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7"></path>
                  <path d="M9 7v8h6V7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Product Units</h3>
            </div>
            <p className="text-sm text-gray-500">Define units of measure for your products.</p>
            <div className="mt-4 text-sm text-gray-500 italic">Coming Soon</div>
          </div>

          {/* Tax Settings Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12" y2="17"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Tax Settings</h3>
            </div>
            <p className="text-sm text-gray-500">Configure tax rates and settings.</p>
            <div className="mt-4 text-sm text-gray-500 italic">Coming Soon</div>
          </div>

          {/* Payment Terms Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <line x1="7" y1="15" x2="7" y2="15"></line>
                  <line x1="12" y1="15" x2="12" y2="15"></line>
                  <line x1="17" y1="15" x2="17" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Payment Terms</h3>
            </div>
            <p className="text-sm text-gray-500">Define payment terms and conditions.</p>
            <div className="mt-4 text-sm text-gray-500 italic">Coming Soon</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyPage;