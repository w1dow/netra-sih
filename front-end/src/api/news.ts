// ============================================================
// News Service
// ============================================================

import { apiClient } from './client';
import type { NewsItem, ApiResponse } from '../types';
import { mockNews } from '../mocks/mockNotifications';

/**
 * GET /api/news
 */
export async function getNews(): Promise<NewsItem[]> {
  // FUTURE: return apiClient.get<ApiResponse<NewsItem[]>>('/news').then(r => r.data);
  return Promise.resolve(mockNews);
}
