export interface CalendarEvent {
  id: string;
  userId?: string;
  tenderId?: string;
  bidId?: string;
  type: 'TENDER_DEADLINE' | 'COMPLIANCE_DEADLINE' | 'DOCUMENT_DEADLINE' | 'EVALUATION_UPDATE' | 'TENDER_UPDATE';
  title: string;
  start: string;
  end?: string;
  description?: string;
}
