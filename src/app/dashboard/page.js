'use client';

import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Button } from '@/components/UI/Button';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your accounts today.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="flex-1 min-w-[140px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Transaction
            </Button>
            <Button variant="outline" className="flex-1 min-w-[140px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Balance Card */}
          <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                  <h3 className="text-2xl font-bold mt-1">$12,345.67</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 8c-1.8 0-3.4.8-4.5 2.1a1 1 0 0 0 0 1.4C8.6 13 10.2 14 12 14c1.8 0 3.4-.8 4.5-2.1a1 1 0 0 0 0-1.4C15.4 9 13.8 8 12 8z" />
                    <path d="M12 8v1" />
                    <path d="M12 13v1" />
                    <path d="M12 3v1" />
                    <path d="M12 20v1" />
                    <path d="m17 7-1 1" />
                    <path d="m7 17-1 1" />
                    <path d="m17 17-1-1" />
                    <path d="m7 7-1-1" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                +2.5% from last month
              </p>
            </div>
          </div>

          {/* Income Card */}
          <div className="relative rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 p-6 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Income</p>
                  <h3 className="text-2xl font-bold mt-1">$4,567.89</h3>
                </div>
                <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 12v.01" />
                    <path d="M12 17v.01" />
                    <path d="M12 7v.01" />
                    <path d="M14 21.9V3a1 1 0 0 0-2 0v18.9" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                +1.2% from last month
              </p>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="relative rounded-xl bg-gradient-to-br from-red-500/10 to-rose-500/5 border border-red-500/20 p-6 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expenses</p>
                  <h3 className="text-2xl font-bold mt-1">$2,345.67</h3>
                </div>
                <div className="p-3 rounded-full bg-red-500/20 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12h20" />
                    <path d="m6 8-4 4 4 4" />
                    <path d="m18 8 4 4-4 4" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                  <polyline points="16 17 22 17 22 11" />
                </svg>
                -0.8% from last month
              </p>
            </div>
          </div>

          {/* Transactions Card */}
          <div className="relative rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20 p-6 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                  <h3 className="text-2xl font-bold mt-1">24</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-500/20 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                +3 from yesterday
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-card/50 to-card/30 border border-border p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { id: 1, description: 'Grocery Store', amount: '-$87.50', date: 'Nov 18', category: 'Food', icon: '🛒' },
                { id: 2, description: 'Salary Deposit', amount: '+$2,500.00', date: 'Nov 15', category: 'Income', icon: '💰' },
                { id: 3, description: 'Electric Bill', amount: '-$120.30', date: 'Nov 12', category: 'Utilities', icon: '💡' },
                { id: 4, description: 'Freelance Work', amount: '+$850.00', date: 'Nov 10', category: 'Income', icon: '💼' },
                { id: 5, description: 'Restaurant', amount: '-$65.20', date: 'Nov 8', category: 'Dining', icon: '🍽️' },
              ].map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-accent/30 transition-colors duration-150">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      <span className="text-lg">{transaction.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span>{transaction.category}</span>
                      </div>
                    </div>
                  </div>
                  <p className={`font-medium ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-card/50 to-card/30 border border-border p-6 shadow-lg backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-6">Spending by Category</h3>
            <div className="space-y-4">
              {[
                { category: 'Food & Dining', amount: '$420.50', percentage: 35, color: 'bg-primary' },
                { category: 'Transportation', amount: '$180.25', percentage: 15, color: 'bg-blue-500' },
                { category: 'Shopping', amount: '$220.75', percentage: 18, color: 'bg-purple-500' },
                { category: 'Utilities', amount: '$180.30', percentage: 15, color: 'bg-orange-500' },
                { category: 'Entertainment', amount: '$95.50', percentage: 8, color: 'bg-green-500' },
                { category: 'Other', amount: '$110.20', percentage: 9, color: 'bg-gray-500' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-medium">{item.amount}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${item.color} transition-all duration-500 ease-out`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-sm font-medium mb-3">Account Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Savings Rate</span>
                  <span className="font-medium">$2,120.22</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Monthly Income</span>
                  <span className="font-medium">$3,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Monthly Expenses</span>
                  <span className="font-medium">$1,230</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;