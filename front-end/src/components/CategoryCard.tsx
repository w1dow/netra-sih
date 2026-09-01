import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Monitor,
  Heart,
  Shield,
  Train,
  GraduationCap,
  Zap,
  HardHat,
} from 'lucide-react';
import type { ProcurementCategory } from '@/types';
import './CategoryCard.css';

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  Building2,
  Monitor,
  Heart,
  Shield,
  Train,
  GraduationCap,
  Zap,
  HardHat,
};

interface CategoryCardProps {
  category: ProcurementCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Building2;

  return (
    <Link to={`/tenders?category=${encodeURIComponent(category.name)}`} className="category-card">
      <div className="category-card__icon">
        <Icon size={24} />
      </div>
      <h3 className="category-card__name">{category.name}</h3>
      <p className="category-card__count">
        {category.activeTenders.toLocaleString()} Active Tenders
      </p>
    </Link>
  );
}
