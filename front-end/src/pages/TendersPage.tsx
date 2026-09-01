import React, { useState, useMemo } from 'react';
import TenderCard from '@/components/TenderCard';
import TenderFilters from '@/components/TenderFilters';
import { tenders } from '@/data';
import type { TenderFilters as TenderFiltersType } from '@/types';
import './Pages.css';

const emptyFilters: TenderFiltersType = {
  department: '',
  category: '',
  location: '',
  tenderValue: '',
  closingDate: '',
  status: '',
};

export default function TendersPage() {
  const [filters, setFilters] = useState<TenderFiltersType>(emptyFilters);

  const filteredTenders = useMemo(() => {
    return tenders.filter((t) => {
      if (filters.department && t.department !== filters.department) return false;
      if (filters.category && t.category !== filters.category) return false;
      if (filters.location && t.location !== filters.location) return false;
      if (filters.status && t.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Active Tenders</h1>
          <p className="page__description">
            Browse and filter all current government procurement opportunities.
          </p>
        </div>
      </div>
      <div className="page__body">
        <TenderFilters filters={filters} onChange={setFilters} />
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          Showing {filteredTenders.length} of {tenders.length} tenders
        </p>
        {filteredTenders.length > 0 ? (
          <div className="tenders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-5)' }}>
            {filteredTenders.map((tender) => (
              <TenderCard key={tender.id} tender={tender} />
            ))}
          </div>
        ) : (
          <div className="tenders-empty">
            <p>No tenders match your current filters.</p>
            <button className="tenders-empty__reset" onClick={() => setFilters(emptyFilters)}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
