import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import TenderCard from '@/components/shared/TenderCard';
import TenderFilters from '@/components/shared/TenderFilters';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import { useTenders } from '@/hooks';
import type { TenderFilters as TenderFiltersType } from '@/types';
import '../Pages.css';

const emptyFilters: TenderFiltersType = {
  department: '',
  category: '',
  location: '',
  tenderValue: '',
  closingDate: '',
  status: '',
  search: '',
};

export default function TendersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<TenderFiltersType>({
    ...emptyFilters,
    search: initialSearch,
  });

  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Sync state if search param changes
  useEffect(() => {
    const s = searchParams.get('search') || '';
    setSearchQuery(s);
    setFilters(prev => ({ ...prev, search: s }));
  }, [searchParams]);

  const { data: tenders, loading, error, refetch } = useTenders(filters);

  const filteredTenders = useMemo(() => {
    if (!tenders) return [];
    return tenders.filter((t) => {
      const deptName = t.departmentName || (t as any).department || '';
      const catName = t.categoryName || (t as any).category || '';
      if (filters.department && deptName !== filters.department) return false;
      if (filters.category && catName !== filters.category) return false;
      if (filters.location && t.location !== filters.location) return false;
      if (filters.status && t.status !== filters.status) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesId = t.tenderId.toLowerCase().includes(q);
        const matchesDept = deptName.toLowerCase().includes(q);
        const matchesDesc = (t.description || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesId && !matchesDept && !matchesDesc) return false;
      }
      return true;
    });
  }, [tenders, filters]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchQuery }));
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Active Tenders</h1>
          <p className="page__description">
            Browse, search and filter all current government procurement opportunities.
          </p>
        </div>
      </div>
      <div className="page__body">
        {/* Search bar inside tenders page */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '42px', height: '44px' }}
              placeholder="Search by tender title, GEM ID, department or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn--primary" style={{ height: '44px' }}>
            Search
          </button>
        </form>

        <TenderFilters filters={filters} onChange={setFilters} />

        {loading ? (
          <LoadingState message="Loading tenders list..." />
        ) : error ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : (
          <>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', fontWeight: 500 }}>
              Showing {filteredTenders.length} {filteredTenders.length === 1 ? 'tender' : 'tenders'}
              {filters.search && ` matching "${filters.search}"`}
            </p>

            {filteredTenders.length > 0 ? (
              <div className="tenders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-5)' }}>
                {filteredTenders.map((tender) => (
                  <TenderCard key={tender.id} tender={tender} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="search"
                title="No Tenders Found"
                message="No tenders match your current search query or filter selection."
                actionLabel="Reset Filters & Search"
                onAction={() => {
                  setFilters(emptyFilters);
                  setSearchQuery('');
                  setSearchParams({});
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
