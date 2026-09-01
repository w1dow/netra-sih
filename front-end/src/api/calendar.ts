// ============================================================
// Calendar Service
// ============================================================

import { apiClient } from './client';
import type { CalendarEvent, ApiResponse } from '../types';
import { mockCalendarEvents } from '../mocks/mockNotifications';

/**
 * GET /api/calendar/events
 */
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  // FUTURE: return apiClient.get<ApiResponse<CalendarEvent[]>>('/calendar/events').then(r => r.data);
  return Promise.resolve(mockCalendarEvents);
}
