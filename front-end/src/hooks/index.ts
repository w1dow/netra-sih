// ============================================================
// Custom Hooks — Data Fetching with Loading/Error/Empty States
// ============================================================
// Each hook follows the pattern:
//   Page → Hook → Service → API Client → Express
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import type { Tender, Bid, ComplianceAssessment, User, Company, Notification, CalendarEvent, NewsItem, TenderFilters } from '../types';

import * as tenderService from '../api/tenders';
import * as bidService from '../api/bids';
import * as complianceService from '../api/compliance';
import * as authService from '../api/auth';
import * as companyService from '../api/company';
import * as notificationService from '../api/notifications';
import * as calendarService from '../api/calendar';
import * as newsService from '../api/news';

// --- Generic async data hook ---
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

  useEffect(() => { refetch(); }, [refetch]);

  return { data, loading, error, refetch };
}

// --- Tenders ---
export function useTenders(filters?: Partial<TenderFilters>) {
  return useAsync(
    () => tenderService.getTenders(filters).then(r => r.data),
    [JSON.stringify(filters)]
  );
}

export function useTender(id: string) {
  return useAsync(() => tenderService.getTenderById(id), [id]);
}

export function useTenderSearch(query: string) {
  return useAsync(() => tenderService.searchTenders(query), [query]);
}

// --- Bids ---
export function useMyBids() {
  return useAsync(() => bidService.getMyBids(), []);
}

export function useBid(id: string) {
  return useAsync(() => bidService.getBidById(id), [id]);
}

// --- Compliance ---
export function useCompliance(bidId: string) {
  return useAsync(() => complianceService.getComplianceByBidId(bidId), [bidId]);
}

// --- Auth / User / Company ---
export function useCurrentUser() {
  return useAsync(() => authService.getCurrentUser(), []);
}

export function useCompany(id: string) {
  return useAsync(() => companyService.getCompanyById(id), [id]);
}

// --- Notifications ---
export function useNotifications() {
  return useAsync(() => notificationService.getNotifications(), []);
}

export function useUnreadCount() {
  return useAsync(() => notificationService.getUnreadCount(), []);
}

// --- Calendar ---
export function useCalendarEvents() {
  return useAsync(() => calendarService.getCalendarEvents(), []);
}

// --- News ---
export function useNews() {
  return useAsync(() => newsService.getNews(), []);
}
