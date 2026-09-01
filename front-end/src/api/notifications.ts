// ============================================================
// Notifications Service
// ============================================================

import { apiClient } from './client';
import type { Notification, ApiResponse } from '../types';
import { mockNotifications } from '../mocks/mockNotifications';

/**
 * GET /api/notifications
 */
export async function getNotifications(): Promise<Notification[]> {
  // FUTURE: return apiClient.get<ApiResponse<Notification[]>>('/notifications').then(r => r.data);
  return Promise.resolve(mockNotifications);
}

/**
 * PATCH /api/notifications/:id/read
 */
export async function markNotificationAsRead(id: string): Promise<void> {
  // FUTURE: return apiClient.patch(`/notifications/${id}/read`, {});
  const notif = mockNotifications.find(n => n.id === id);
  if (notif) notif.read = true;
  return Promise.resolve();
}

/**
 * Get unread notification count
 */
export async function getUnreadCount(): Promise<number> {
  // FUTURE: return apiClient.get<ApiResponse<{count: number}>>('/notifications/unread-count').then(r => r.data.count);
  return Promise.resolve(mockNotifications.filter(n => !n.read).length);
}
