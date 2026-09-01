import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, FilePlus, ShieldCheck, BarChart3 } from 'lucide-react';
import { quickActions } from '@/data';
import './QuickActions.css';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={18} />,
  FilePlus: <FilePlus size={18} />,
  ShieldCheck: <ShieldCheck size={18} />,
  BarChart3: <BarChart3 size={18} />,
};

export default function QuickActions() {
  return (
    <div className="quick-actions" aria-label="Quick actions">
      {quickActions.map((action) => (
        <Link key={action.href} to={action.href} className="quick-actions__btn">
          {iconMap[action.icon]}
          <span>{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
