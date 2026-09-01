import React from 'react';
import type { TenderFilters as TenderFiltersType } from '../types';
import { departmentOptions, categoryOptions, locationOptions, statusOptions } from '../constants';
import { RotateCcw } from 'lucide-react';

interface TenderFiltersProps {
  filters: TenderFiltersType;
  onChange: (filters: TenderFiltersType) => void;
}

export default function TenderFilters({ filters, onChange }: TenderFiltersProps) {
  const handleChange = (key: keyof TenderFiltersType, value: string) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const hasActiveFilters = Object.values(filters).some((val) => val && val.trim() !== '');

  const handleReset = () => {
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

  return (
    <div className="tender-filters">
      <div className="tender-filters__grid">
        {/* Department Filter */}
        <div className="tender-filters__field">
          <label className="tender-filters__label">Department</label>
          <select
            className="form-select"
            value={filters.department || ''}
            onChange={(e) => handleChange('department', e.target.value)}
          >
            {departmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="tender-filters__field">
          <label className="tender-filters__label">Category</label>
          <select
            className="form-select"
            value={filters.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="tender-filters__field">
          <label className="tender-filters__label">Location</label>
          <select
            className="form-select"
            value={filters.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          >
            {locationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="tender-filters__field">
          <label className="tender-filters__label">Status</label>
          <select
            className="form-select"
            value={filters.status || ''}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="tender-filters__reset-row">
          <button type="button" onClick={handleReset} className="tender-filters__reset-btn">
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
