import React from 'react';
import { Lock, Brain, ClipboardCheck, UserCheck } from 'lucide-react';
import type { TrustPillar as TrustPillarType } from '@/types';
import './TrustPillar.css';

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  Lock,
  Brain,
  ClipboardCheck,
  UserCheck,
};

interface TrustPillarProps {
  pillar: TrustPillarType;
}

export default function TrustPillarCard({ pillar }: TrustPillarProps) {
  const Icon = iconMap[pillar.icon] || Lock;

  return (
    <div className="trust-pillar">
      <div className="trust-pillar__icon">
        <Icon size={24} />
      </div>
      <h3 className="trust-pillar__title">{pillar.title}</h3>
      <p className="trust-pillar__desc">{pillar.description}</p>
    </div>
  );
}
