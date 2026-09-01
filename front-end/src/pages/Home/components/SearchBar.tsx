import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch?: (query: string, category: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query, category);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search" aria-label="Search tenders">
      <div className="search-bar__category">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="search-bar__select"
          aria-label="Search category"
        >
          <option value="all">All</option>
          <option value="tenders">Tenders</option>
          <option value="departments">Departments</option>
          <option value="bidders">Bidders</option>
          <option value="organisations">Organisations</option>
        </select>
        <ChevronDown size={14} className="search-bar__chevron" />
      </div>
      <div className="search-bar__divider" />
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search tenders, departments, bid IDs or organisations"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search query"
      />
      <button type="submit" className="search-bar__submit" aria-label="Search Tenders">
        <Search size={18} />
        <span>Search Tenders</span>
      </button>
    </form>
  );
}
