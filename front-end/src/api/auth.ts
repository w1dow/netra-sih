// ============================================================
// Auth Service — Handles authentication API calls
// ============================================================
// CURRENT: Returns mock data
// FUTURE:  Replace mock returns with apiClient calls
// ============================================================

import { apiClient } from './client';
import type { User, Company, ApiResponse } from '../types';
import { mockUser, mockCompany } from '../mocks/mockUsers';

/**
 * POST /api/auth/login
 */
export async function login(credentials: { email: string; password: string }): Promise<User> {
  // FUTURE: return apiClient.post<ApiResponse<User>>('/auth/login', credentials).then(r => r.data);
  return Promise.resolve(mockUser);
}

/**
 * POST /api/auth/logout
 */
export async function logout(): Promise<void> {
  // FUTURE: return apiClient.post<void>('/auth/logout', {});
  return Promise.resolve();
}

/**
 * GET /api/auth/me
 */
export async function getCurrentUser(): Promise<User> {
  // FUTURE: return apiClient.get<ApiResponse<User>>('/auth/me').then(r => r.data);
  return Promise.resolve(mockUser);
}

/**
 * GET /api/company/:id
 */
export async function getCompanyById(id: string): Promise<Company> {
  // FUTURE: return apiClient.get<ApiResponse<Company>>(`/company/${id}`).then(r => r.data);
  return Promise.resolve(mockCompany);
}
