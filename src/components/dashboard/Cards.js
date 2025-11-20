import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../UI/Card';
import { cn } from '@/lib/utils';
import {
  Activity,
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react';

const CardIconWrapper = ({ children, colorClass }) => (
  <div className={cn(
    "w-12 h-12 rounded-full flex items-center justify-center",
    colorClass
  )}>
    {children}
  </div>
);

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  color = 'blue',
  className = '' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    purple: 'bg-purple-500/10 text-purple-500',
    orange: 'bg-orange-500/10 text-orange-500',
  };

  const iconColorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
  };

  const colorClass = colorClasses[color] || colorClasses.blue;
  const iconColorClass = iconColorClasses[color] || iconColorClasses.blue;

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardDescription className="text-sm font-medium">{title}</CardDescription>
          <CardTitle className="text-2xl font-bold mt-1">{value}</CardTitle>
        </div>
        <CardIconWrapper colorClass={colorClass}>
          <Icon className={cn("h-6 w-6", iconColorClass)} />
        </CardIconWrapper>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const Cards = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      <StatCard
        title="Total Accounts"
        value="24"
        description="+12% from last month"
        icon={Users}
        color="blue"
      />
      <StatCard
        title="Active Accounts"
        value="18"
        description="+8% from last month"
        icon={Activity}
        color="green"
      />
      <StatCard
        title="Pending Approval"
        value="3"
        description="-2 from last month"
        icon={TrendingUp}
        color="orange"
      />
      <StatCard
        title="Avg. Balance"
        value="$12,450"
        description="+3.2% from last month"
        icon={DollarSign}
        color="purple"
      />
    </div>
  );
};

export { Cards, StatCard };