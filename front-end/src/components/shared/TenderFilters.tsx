import React from 'react';
import { Filter, X } from 'lucide-react';
import type { TenderFilters as TenderFiltersType, FilterOption } from '@/types';
import {
  departmentOptions,
  categoryOptions,
  locationOptions,
  tenderValueOptions,
  statusOptions,
} from '@/data';
import './TenderFilters.css';

interface TenderFiltersProps {
  filters: TenderFiltersType;
  onChange: (filters: TenderFiltersType) => void;
}

export default function TenderFilters({ filters, onChange }: TenderFiltersProps) {
  const handleChange = (key: keyof TenderFiltersType, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({
      department: '',
      category: '',
      location: '',
      tenderValue: '',
      closingDate: '',
      status: '',
      search: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '' && v !== undefined);

  return (
    <div className="tender-filters">
      <div className="tender-filters__header">
        <div className="tender-filters__title">
          <Filter size={16} />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button className="tender-filters__clear" onClick={clearFilters}>
            <X size={14} />
            Clear Filters
          </button>
        )}
      </div>
      <div className="tender-filters__grid">
        <FilterSelect
          label="Department"
          value={filters.department || ''}
          options={departmentOptions}
          onChange={(v) => handleChange('department', v)}
        />
        <FilterSelect
          label="Category"
          value={filters.category || ''}
          options={categoryOptions}
          onChange={(v) => handleChange('category', v)}
        />
        <FilterSelect
          label="Location"
          value={filters.location || ''}
          options={locationOptions}
          onChange={(v) => handleChange('location', v)}
        />
        <FilterSelect
          label="Tender Value"
          value={filters.tenderValue || ''}
          options={tenderValueOptions}
          onChange={(v) => handleChange('tenderValue', v)}
        />
        <FilterSelect
          label="Status"
          value={filters.status || ''}
          options={statusOptions}
          onChange={(v) => handleChange('status', v)}
        />
      </div>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <div className="filter-select">
      <label className="filter-select__label">{label}</label>
      <select
        className="filter-select__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`Filter by ${label}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
