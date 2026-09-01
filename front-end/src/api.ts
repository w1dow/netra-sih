// ============================================================
// NETRA — Fetch API Communication Layer & React Data Hooks
// Connects Frontend to Express JS & MySQL Backend
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import type {
  Tender,
  TenderFilters,
  Bid,
  ComplianceAssessment,
  User,
  Company,
  Notification,
  CalendarEvent,
  NewsItem,
  ApiResponse,
} from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Standard Native Fetch API wrapper
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`);
    }

    const res: ApiResponse<T> = await response.json();
    return res.data !== undefined ? res.data : (res as any);
  } catch (err: any) {
    console.error(`[API Fetch Error] ${endpoint}:`, err);
    throw err;
  }
}

// ============================================================
// API Service Methods (Native Fetch API)
// ============================================================

export async function getTenders(filters?: Partial<TenderFilters>): Promise<Tender[]> {
  const params = new URLSearchParams();
  if (filters) {
    if (filters.department) params.append('department', filters.department);
    if (filters.category) params.append('category', filters.category);
    if (filters.location) params.append('location', filters.location);
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
  }
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchApi<Tender[]>(`/tenders${query}`);
}

export async function getTenderById(id: string): Promise<Tender> {
  return fetchApi<Tender>(`/tenders/${id}`);
}

export async function createTender(data: Partial<Tender>): Promise<Tender> {
  return fetchApi<Tender>('/tenders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMyBids(): Promise<Bid[]> {
  return fetchApi<Bid[]>('/bids');
}

export async function getBidById(id: string): Promise<Bid> {
  return fetchApi<Bid>(`/bids/${id}`);
}

export async function createBid(data: Partial<Bid>): Promise<Bid> {
  return fetchApi<Bid>('/bids', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getComplianceByBidId(bidId: string): Promise<ComplianceAssessment> {
  return fetchApi<ComplianceAssessment>(`/compliance/${bidId}`);
}

export async function getCurrentUser(): Promise<User> {
  return fetchApi<User>('/auth/me');
}

export async function getCompanyById(id: string): Promise<Company> {
  return fetchApi<Company>(`/company/${id}`);
}

export async function getNotifications(): Promise<Notification[]> {
  return fetchApi<Notification[]>('/notifications');
}

export async function getNews(): Promise<NewsItem[]> {
  return fetchApi<NewsItem[]>('/news');
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  return fetchApi<CalendarEvent[]>('/calendar');
}

// ============================================================
// React Custom Hooks
// ============================================================

export function useAsync<T>(fetchFn: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchFn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, deps);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

export function useTenders(filters?: Partial<TenderFilters>) {
  return useAsync(() => getTenders(filters), [JSON.stringify(filters)]);
}

export function useTender(id: string) {
  return useAsync(() => getTenderById(id), [id]);
}

export function useMyBids() {
  return useAsync(() => getMyBids(), []);
}

export function useBid(id: string) {
  return useAsync(() => getBidById(id), [id]);
}

export function useCompliance(bidId: string) {
  return useAsync(() => getComplianceByBidId(bidId), [bidId]);
}

export function useCurrentUser() {
  return useAsync(() => getCurrentUser(), []);
}

export function useCompany(id: string) {
  return useAsync(() => getCompanyById(id), [id]);
}

export function useNotifications() {
  return useAsync(() => getNotifications(), []);
}

export function useCalendarEvents() {
  return useAsync(() => getCalendarEvents(), []);
}

export function useNews() {
  return useAsync(() => getNews(), []);
}
