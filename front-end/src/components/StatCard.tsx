import React from 'react';
import {
  FileText,
  CheckCircle,
  ShieldCheck,
  Users,
  FileCheck,
  TrendingDown,
} from 'lucide-react';
import type { Statistic } from '@/types';
import './StatCard.css';

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  FileText,
  CheckCircle,
  ShieldCheck,
  Users,
  FileCheck,
  TrendingDown,
};

interface StatCardProps {
  stat: Statistic;
}

export default function StatCard({ stat }: StatCardProps) {
  const Icon = iconMap[stat.icon] || FileText;

  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ color: stat.accentColor }}>
        <Icon size={22} />
      </div>
      <div className="stat-card__value">{stat.value}</div>
      <div className="stat-card__label">{stat.label}</div>
    </div>
  );
}
