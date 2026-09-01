// ============================================================
// Bids Service — Handles bid-related API calls
// ============================================================

import { apiClient } from './client';
import type { Bid, ApiResponse } from '../types';
import { mockBids } from '../mocks/mockBids';
import { mockTenders } from '../mocks/mockTenders';

/**
 * GET /api/my-tenders (bids belonging to the current user's company)
 */
export async function getMyBids(): Promise<Bid[]> {
  // FUTURE: return apiClient.get<ApiResponse<Bid[]>>('/my-tenders').then(r => r.data);
  return Promise.resolve(mockBids);
}

/**
 * GET /api/bids/:id
 */
export async function getBidById(id: string): Promise<Bid> {
  // FUTURE: return apiClient.get<ApiResponse<Bid>>(`/bids/${id}`).then(r => r.data);
  const bid = mockBids.find(b => b.id === id);
  if (!bid) throw { status: 404, code: 'BID_NOT_FOUND', message: 'Bid not found' };
  return Promise.resolve(bid);
}

/**
 * POST /api/bids
 */
export async function createBid(data: { tenderId: string }): Promise<Bid> {
  // FUTURE: return apiClient.post<ApiResponse<Bid>>('/bids', data).then(r => r.data);
  const newBid: Bid = {
    id: 'bid-new-' + Date.now(),
    tenderId: data.tenderId,
    bidderCompanyId: 'company-001',
    status: 'DRAFT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isEditable: true,
    allowedActions: ['VIEW', 'EDIT', 'UPLOAD_DOCUMENT', 'SUBMIT'],
  };
  return Promise.resolve(newBid);
}

/**
 * PATCH /api/bids/:id
 */
export async function updateBid(id: string, data: Partial<Bid>): Promise<Bid> {
  // FUTURE: return apiClient.patch<ApiResponse<Bid>>(`/bids/${id}`, data).then(r => r.data);
  const bid = mockBids.find(b => b.id === id);
  if (!bid) throw { status: 404, code: 'BID_NOT_FOUND', message: 'Bid not found' };
  return Promise.resolve({ ...bid, ...data, updatedAt: new Date().toISOString() });
}

/**
 * Helper: Get the tender object associated with a bid
 */
export function getTenderForBid(bid: Bid) {
  return mockTenders.find(t => t.id === bid.tenderId);
}
