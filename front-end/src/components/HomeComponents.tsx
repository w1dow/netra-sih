import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  FileText,
  CheckCircle,
  ShieldCheck,
  Users,
  FileCheck,
  TrendingDown,
  Building2,
  Monitor,
  Heart,
  Shield,
  Train,
  GraduationCap,
  Zap,
  HardHat,
  Lock,
  Brain,
  ClipboardCheck,
  UserCheck,
  FilePlus,
  BarChart3,
} from 'lucide-react';
import type { Statistic, ProcurementCategory, TrustPillar } from '../types';
import { quickActions } from '../constants';

const ICON_MAP: Record<string, any> = {
  FileText,
  CheckCircle,
  ShieldCheck,
  Users,
  FileCheck,
  TrendingDown,
  Building2,
  Monitor,
  Heart,
  Shield,
  Train,
  GraduationCap,
  Zap,
  HardHat,
  Lock,
  Brain,
  ClipboardCheck,
  UserCheck,
  FilePlus,
  BarChart3,
};

// ----- SearchBar -----
export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="hero__search-form" onSubmit={handleSubmit}>
      <div className="hero__search-input-wrapper">
        <Search className="hero__search-icon" size={20} />
        <input
          type="text"
          className="hero__search-input"
          placeholder="Search active tenders by title, GEM ID, department or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button type="submit" className="hero__search-btn">
        Search Tenders
      </button>
    </form>
  );
}

// ----- QuickActions -----
export function QuickActions() {
  return (
    <div className="hero__quick-actions">
      {quickActions.map((act) => {
        const IconComponent = ICON_MAP[act.icon] || FileText;
        return (
          <Link key={act.label} to={act.href} className="hero__quick-btn">
            <IconComponent size={16} />
            <span>{act.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

// ----- StatCard -----
export function StatCard({ stat }: { stat: Statistic }) {
  const IconComponent = ICON_MAP[stat.icon] || FileText;
  return (
    <div className="stat-card__item">
      <div className="stat-card__icon-box" style={{ color: stat.accentColor }}>
        <IconComponent size={24} />
      </div>
      <div className="stat-card__content">
        <span className="stat-card__value">{stat.value}</span>
        <span className="stat-card__label">{stat.label}</span>
      </div>
    </div>
  );
}

// ----- CategoryCard -----
export function CategoryCard({ category }: { category: ProcurementCategory }) {
  const IconComponent = ICON_MAP[category.icon] || Building2;
  return (
    <Link to={`/tenders?category=${encodeURIComponent(category.name)}`} className="category-card">
      <div className="category-card__icon-box">
        <IconComponent size={24} />
      </div>
      <div className="category-card__info">
        <h3 className="category-card__name">{category.name}</h3>
        <span className="category-card__count">{category.activeTenders.toLocaleString('en-IN')} Tenders</span>
      </div>
    </Link>
  );
}

// ----- TrustPillarCard -----
export function TrustPillarCard({ pillar }: { pillar: TrustPillar }) {
  const IconComponent = ICON_MAP[pillar.icon] || Lock;
  return (
    <div className="trust-card">
      <div className="trust-card__icon-box">
        <IconComponent size={26} />
      </div>
      <h3 className="trust-card__title">{pillar.title}</h3>
      <p className="trust-card__desc">{pillar.description}</p>
    </div>
  );
}
