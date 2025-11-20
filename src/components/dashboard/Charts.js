import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../UI/Card';
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
  Line
} from 'recharts';
import { cn } from '@/lib/utils';

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

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4", className)}>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Account Trends</CardTitle>
          <CardDescription>
            Showing total and active accounts over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }} 
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  name="Total Accounts"
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  name="Active Accounts"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Account Categories</CardTitle>
          <CardDescription>
            Distribution across different account categories
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }} 
                />
                <Legend />
                <Bar 
                  dataKey="total" 
                  fill="hsl(var(--primary))" 
                  name="Account Count"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { DashboardCharts };