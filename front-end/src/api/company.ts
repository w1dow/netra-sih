// ============================================================
// Company Service — Handles company profile API calls
// ============================================================

import { apiClient } from './client';
import type { Company, ApiResponse } from '../types';
import { mockCompany } from '../mocks/mockUsers';

/**
 * GET /api/company/:id
 */
export async function getCompanyById(id: string): Promise<Company> {
  // FUTURE: return apiClient.get<ApiResponse<Company>>(`/company/${id}`).then(r => r.data);
  return Promise.resolve(mockCompany);
}

/**
 * PATCH /api/company/:id
 */
export async function updateCompany(id: string, data: Partial<Company>): Promise<Company> {
  // FUTURE: return apiClient.patch<ApiResponse<Company>>(`/company/${id}`, data).then(r => r.data);
  return Promise.resolve({ ...mockCompany, ...data });
}
