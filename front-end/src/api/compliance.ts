// ============================================================
// Compliance Service — Handles compliance API calls
// ============================================================

import { apiClient } from './client';
import type { ComplianceAssessment, ComplianceStage, ApiResponse } from '../types';
import { mockCompliance } from '../mocks/mockCompliance';

/**
 * GET /api/compliance/bids/:bidId
 */
export async function getComplianceByBidId(bidId: string): Promise<ComplianceAssessment> {
  // FUTURE: return apiClient.get<ApiResponse<ComplianceAssessment>>(`/compliance/bids/${bidId}`).then(r => r.data);
  const assessment = mockCompliance.find(c => c.bidId === bidId);
  if (!assessment) throw { status: 404, code: 'COMPLIANCE_NOT_FOUND', message: 'Compliance information not found' };
  return Promise.resolve(assessment);
}

/**
 * GET /api/compliance/:id
 */
export async function getComplianceStages(assessmentId: string): Promise<ComplianceStage[]> {
  // FUTURE: return apiClient.get<ApiResponse<ComplianceStage[]>>(`/compliance/${assessmentId}/stages`).then(r => r.data);
  const assessment = mockCompliance.find(c => c.id === assessmentId);
  if (!assessment) throw { status: 404, code: 'COMPLIANCE_NOT_FOUND', message: 'Compliance stages not found' };
  return Promise.resolve(assessment.stages);
}
