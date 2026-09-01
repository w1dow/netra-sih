export type NotificationType =
  | 'COMPLIANCE_ACTION_REQUIRED'
  | 'TENDER_DEADLINE'
  | 'BID_SUBMITTED'
  | 'COMPLIANCE_COMPLETED'
  | 'TENDER_STATUS_UPDATED';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  tenderId?: string;
  bidId?: string;
  read: boolean;
  createdAt: string;
}
