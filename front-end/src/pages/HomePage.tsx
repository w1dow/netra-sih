import React, { useState, useMemo } from 'react';
import SearchBar from '@/components/SearchBar';
import QuickActions from '@/components/QuickActions';
import StatCard from '@/components/StatCard';
import TenderCard from '@/components/TenderCard';
import TenderFilters from '@/components/TenderFilters';
import ComplianceWorkflow from '@/components/ComplianceWorkflow';
import ComplianceCheckItem from '@/components/ComplianceCheckItem';
import CategoryCard from '@/components/CategoryCard';
import TrustPillarCard from '@/components/TrustPillar';
import {
  statistics,
  tenders,
  procurementCategories,
  complianceChecks,
  trustPillars,
} from '@/data';
import type { TenderFilters as TenderFiltersType } from '@/types';
import './HomePage.css';

const emptyFilters: TenderFiltersType = {
  department: '',
  category: '',
  location: '',
  tenderValue: '',
  closingDate: '',
  status: '',
};

export default function HomePage() {
  const [filters, setFilters] = useState<TenderFiltersType>(emptyFilters);

  // Filter tenders based on active filters
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
          <SearchBar />
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
          {filteredTenders.length > 0 ? (
            <div className="tenders-grid">
              {filteredTenders.map((tender) => (
                <TenderCard key={tender.id} tender={tender} />
              ))}
            </div>
          ) : (
            <div className="tenders-empty">
              <p>No tenders match your current filters.</p>
              <button
                className="tenders-empty__reset"
                onClick={() => setFilters(emptyFilters)}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

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
