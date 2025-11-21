import React from 'react';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const DashboardCharts = ({ className }) => {
  // Mock data for the charts
  const accountData = [
    { name: 'Jan', total: 4000, active: 2400 },
    { name: 'Feb', total: 3000, active: 1398 },
    { name: 'Mar', total: 2000, active: 9800 },
    { name: 'Apr', total: 2780, active: 3908 },
    { name: 'May', total: 1890, active: 4800 },
    { name: 'Jun', total: 2390, active: 3800 },
  ];

  const categoryData = [
    { name: 'Bank', total: 4000 },
    { name: 'Cash', total: 3000 },
    { name: 'Investment', total: 2000 },
    { name: 'Credit', total: 2780 },
    { name: 'Loan', total: 1890 },
  ];

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-4 border border-border rounded-lg shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-medium">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4", className)}>
      {/* Account Trends Line Chart */}
      <div className="bg-card p-5 rounded-xl border border-border shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground">Account Trends</h3>
          <p className="text-sm text-muted-foreground">
            Showing total and active accounts over the last 6 months
          </p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={accountData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip content={customTooltip} />
              <Legend
                wrapperStyle={{ paddingTop: 10 }}
                formatter={(value) => <span className="text-foreground">{value}</span>}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4, fill: '#4f46e5' }}
                activeDot={{ r: 6, fill: '#4f46e5' }}
                name="Total Accounts"
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4, fill: '#10b981' }}
                activeDot={{ r: 6, fill: '#10b981' }}
                name="Active Accounts"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Account Categories Bar Chart */}
      <div className="bg-card p-5 rounded-xl border border-border shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground">Account Categories</h3>
          <p className="text-sm text-muted-foreground">
            Distribution across different account categories
          </p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip content={customTooltip} />
              <Legend
                wrapperStyle={{ paddingTop: 10 }}
                formatter={(value) => <span className="text-foreground">{value}</span>}
              />
              <Bar
                dataKey="total"
                name="Account Count"
                radius={[4, 4, 0, 0]}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export { DashboardCharts };