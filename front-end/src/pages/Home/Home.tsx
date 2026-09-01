import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import QuickActions from './components/QuickActions';
import StatCard from './components/StatCard';
import TenderCard from '@/components/shared/TenderCard';
import TenderFilters from '@/components/shared/TenderFilters';
import ComplianceWorkflow from '../Compliance/components/ComplianceWorkflow';
import CategoryCard from './components/CategoryCard';
import TrustPillarCard from './components/TrustPillar';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';

import {
  statistics,
  procurementCategories,
  trustPillars,
} from '@/data';
import { useTenders, useNews } from '@/hooks';
import type { TenderFilters as TenderFiltersType } from '@/types';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import './Home.css';

const emptyFilters: TenderFiltersType = {
  department: '',
  category: '',
  location: '',
  tenderValue: '',
  closingDate: '',
  status: '',
};

export default function HomePage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TenderFiltersType>(emptyFilters);

  // Fetch tenders via service layer
  const { data: tendersData, loading: tendersLoading, error: tendersError, refetch: refetchTenders } = useTenders();

  // Fetch news via service layer
  const { data: newsData } = useNews();

  // Filter tenders locally if needed
  const filteredTenders = useMemo(() => {
    if (!tendersData) return [];
    return tendersData.filter((t) => {
      const deptName = t.departmentName || (t as any).department || '';
      const catName = t.categoryName || (t as any).category || '';
      if (filters.department && deptName !== filters.department) return false;
      if (filters.category && catName !== filters.category) return false;
      if (filters.location && t.location !== filters.location) return false;
      if (filters.status && t.status !== filters.status) return false;
      return true;
    });
  }, [tendersData, filters]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/tenders?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/tenders');
    }
  };

  return (
    <div className="home">
      {/* ===== HERO SECTION ===== */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__content container">
          <h1 className="hero__heading">Transparent & Intelligent Tender Evaluation</h1>
          <p className="hero__subheading">
            AI-powered bid compliance verification for faster, smarter and more transparent
            government procurement.
          </p>
          <SearchBar onSearch={(query) => handleSearch(query)} />
          <QuickActions />
        </div>
      </section>

      {/* ===== KEY STATISTICS ===== */}
      <section className="stats-section" aria-label="Key Statistics">
        <div className="stats-card container">
          {statistics.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      {/* ===== ACTIVE TENDERS ===== */}
      <section className="section tenders-section" aria-labelledby="tenders-heading">
        <div className="container">
          <div className="section__header">
            <h2 id="tenders-heading" className="section__title">Active Tenders</h2>
            <p className="section__subtitle">
              Explore current government procurement opportunities
            </p>
          </div>
          <TenderFilters filters={filters} onChange={setFilters} />

          {tendersLoading ? (
            <LoadingState message="Fetching active tenders..." />
          ) : tendersError ? (
            <ErrorState error={tendersError} onRetry={refetchTenders} />
          ) : filteredTenders.length > 0 ? (
            <div className="tenders-grid">
              {filteredTenders.slice(0, 6).map((tender) => (
                <TenderCard key={tender.id} tender={tender} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="filter"
              title="No Tenders Match Your Criteria"
              message="Try adjusting or clearing your filters to see more tenders."
              actionLabel="Clear Filters"
              onAction={() => setFilters(emptyFilters)}
            />
          )}
        </div>
      </section>

      {/* ===== TENDER & PROCUREMENT UPDATES (NEWS) ===== */}
      {newsData && newsData.length > 0 && (
        <section className="section news-section" aria-labelledby="news-heading" style={{ background: 'var(--color-white)', borderTop: '1px solid var(--color-border-light)' }}>
          <div className="container">
            <div className="section__header">
              <h2 id="news-heading" className="section__title">Tender & Procurement Updates</h2>
              <p className="section__subtitle">Latest government policy notices, procurement circulars & market developments</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
              {newsData.map((item) => (
                <div key={item.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', background: 'var(--color-white)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'var(--color-light-bg)', color: 'var(--color-govt-blue)', textTransform: 'uppercase' }}>
                      {item.category || 'POLICY'}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-IN') : 'Recent'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-deep-navy)', marginBottom: 'var(--space-2)', lineHeight: 1.4 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {item.summary}
                  </p>
                  {item.source && (
                    <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-govt-blue)' }}>
                      Source: {item.source}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== AI COMPLIANCE VERIFICATION ===== */}
      <section className="section compliance-section" aria-labelledby="compliance-heading">
        <div className="container">
          <div className="section__header">
            <h2 id="compliance-heading" className="section__title">
              AI-Powered Bid Compliance Verification
            </h2>
            <p className="section__subtitle">
              Use AI to extract evidence from bidder documents, map requirements, identify
              compliance gaps and surface risk for procurement officers.
            </p>
          </div>

          <div className="compliance-workflow-container">
            <ComplianceWorkflow />
          </div>
        </div>
      </section>

      {/* ===== PROCUREMENT CATEGORIES ===== */}
      <section className="section categories-section" aria-labelledby="categories-heading">
        <div className="container">
          <div className="section__header">
            <h2 id="categories-heading" className="section__title">Procurement Categories</h2>
            <p className="section__subtitle">
              Browse tenders by procurement category
            </p>
          </div>
          <div className="categories-grid">
            {procurementCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRANSPARENCY / TRUST ===== */}
      <section className="trust-section" aria-labelledby="trust-heading">
        <div className="container">
          <div className="section__header">
            <h2 id="trust-heading" className="section__title section__title--light">
              Built for Transparent Public Procurement
            </h2>
          </div>
          <div className="trust-grid">
            {trustPillars.map((pillar) => (
              <TrustPillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>
          <blockquote className="trust-quote">
            <p>
              "AI assists procurement officers by identifying compliance issues and evidence gaps.
              Final procurement decisions remain with the authorised officer."
            </p>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
