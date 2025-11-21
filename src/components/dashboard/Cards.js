import React from 'react';
import { cn } from '@/lib/utils';
import {
  Activity,
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react';

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  color = 'blue',
  className = ''
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      text: 'text-blue-100',
      iconBg: 'bg-blue-400/20',
      iconColor: 'text-blue-300'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      text: 'text-green-100',
      iconBg: 'bg-green-400/20',
      iconColor: 'text-green-300'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      text: 'text-purple-100',
      iconBg: 'bg-purple-400/20',
      iconColor: 'text-purple-300'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      text: 'text-orange-100',
      iconBg: 'bg-orange-400/20',
      iconColor: 'text-orange-300'
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={cn(
      "rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl",
      "border border-border/50 bg-card",
      colors.bg,
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground/80">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          colors.iconBg
        )}>
          <Icon className={cn("h-6 w-6", colors.iconColor)} />
        </div>
      </div>
      <p className={cn(
        "text-xs mt-3",
        colors.text
      )}>{description}</p>
    </div>
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