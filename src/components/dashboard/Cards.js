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
  color = 'primary',
  className = ''
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-gradient-to-br from-[color:var(--theme-primary)] to-[color:var(--theme-secondary)]',
      text: 'text-[color:var(--theme-text)]/80',
      iconBg: 'bg-[color:var(--theme-primary)]/20',
      iconColor: 'text-[color:var(--theme-primary)]/60'
    },
    secondary: {
      bg: 'bg-gradient-to-br from-[color:var(--theme-secondary)] to-[color:var(--theme-accent)]',
      text: 'text-[color:var(--theme-text)]/80',
      iconBg: 'bg-[color:var(--theme-secondary)]/20',
      iconColor: 'text-[color:var(--theme-secondary)]/60'
    },
    accent: {
      bg: 'bg-gradient-to-br from-[color:var(--theme-accent)] to-[color:var(--theme-primary)]',
      text: 'text-[color:var(--theme-text)]/80',
      iconBg: 'bg-[color:var(--theme-accent)]/20',
      iconColor: 'text-[color:var(--theme-accent)]/60'
    },
    background: {
      bg: 'bg-gradient-to-br from-[color:var(--theme-background)] to-[color:var(--theme-card-bg)]',
      text: 'text-[color:var(--theme-text)]/80',
      iconBg: 'bg-[color:var(--theme-background)]/20',
      iconColor: 'text-[color:var(--theme-background)]/60'
    },
  };

  const colors = colorClasses[color] || colorClasses.primary;

  return (
    <div className={cn(
      "rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl",
      "border border-[color:var(--theme-border)] bg-[color:var(--theme-card-bg)]",
      colors.bg,
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[color:var(--theme-text)]/80">{title}</p>
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
        color="primary"
      />
      <StatCard
        title="Active Accounts"
        value="18"
        description="+8% from last month"
        icon={Activity}
        color="secondary"
      />
      <StatCard
        title="Pending Approval"
        value="3"
        description="-2 from last month"
        icon={TrendingUp}
        color="accent"
      />
      <StatCard
        title="Avg. Balance"
        value="$12,450"
        description="+3.2% from last month"
        icon={DollarSign}
        color="background"
      />
    </div>
  );
};

export { Cards, StatCard };