// ============================================================
// Tenders Service — Handles tender-related API calls
// ============================================================

import { apiClient } from './client';
import type { Tender, TenderFilters } from '../types';
import { mockTenders } from '../mocks/mockTenders';

/**
 * GET /api/tenders
 */
export async function getTenders(filters?: Partial<TenderFilters>, page = 1, limit = 20): Promise<{ data: Tender[]; pagination: any }> {
  let results = [...mockTenders];

  if (filters) {
    if (filters.department) results = results.filter(t => (t.departmentName || (t as any).department) === filters.department);
    if (filters.category) results = results.filter(t => (t.categoryName || (t as any).category) === filters.category);
    if (filters.location) results = results.filter(t => t.location === filters.location);
    if (filters.status) results = results.filter(t => t.status === filters.status);
  }

  return Promise.resolve({
    data: results,
    pagination: { page, limit, total: results.length, totalPages: Math.ceil(results.length / limit) },
  });
}

/**
 * GET /api/tenders/:id
 */
export async function getTenderById(id: string): Promise<Tender> {
  const tender = mockTenders.find(t => t.id === id);
  if (!tender) {
    throw { status: 404, code: 'TENDER_NOT_FOUND', message: `Tender with ID '${id}' was not found.` };
  }
  return Promise.resolve(tender);
}

/**
 * GET /api/tenders?search=...
 */
export async function searchTenders(query: string): Promise<Tender[]> {
  const q = query.toLowerCase();
  return Promise.resolve(
    mockTenders.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.tenderId.toLowerCase().includes(q) ||
      (t.departmentName || '').toLowerCase().includes(q) ||
      (t.categoryName || '').toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      (t.description || '').toLowerCase().includes(q)
    )
  );
}
