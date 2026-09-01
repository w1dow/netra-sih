// ============================================================
// Documents Service — Handles document upload/download
// ============================================================

import { apiClient } from './client';

/**
 * POST /api/documents (multipart/form-data)
 */
export async function uploadDocument(file: File, bidId: string, requirementId?: string): Promise<{ id: string; fileName: string }> {
  // FUTURE:
  // const formData = new FormData();
  // formData.append('file', file);
  // formData.append('bidId', bidId);
  // if (requirementId) formData.append('requirementId', requirementId);
  // return fetch(`${API_BASE_URL}/documents`, { method: 'POST', body: formData }).then(r => r.json());
  return Promise.resolve({ id: 'doc-new-' + Date.now(), fileName: file.name });
}

/**
 * GET /api/documents/:id
 */
export async function getDocumentById(id: string): Promise<{ id: string; fileName: string; downloadUrl: string }> {
  // FUTURE: return apiClient.get(`/documents/${id}`).then(r => r.data);
  return Promise.resolve({ id, fileName: 'Document.pdf', downloadUrl: '#' });
}

/**
 * DELETE /api/documents/:id
 */
export async function deleteDocument(id: string): Promise<void> {
  // FUTURE: return apiClient.delete(`/documents/${id}`);
  return Promise.resolve();
}
