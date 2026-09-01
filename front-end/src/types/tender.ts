export type TenderStatus = 'ACTIVE' | 'UPCOMING' | 'UNDER_EVALUATION' | 'UNDER EVALUATION' | 'AWARDED' | 'CLOSED';

export interface Tender {
  id: string;
  tenderId: string;
  title: string;
  description: string;
  departmentId?: string;
  departmentName?: string;
  categoryId?: string;
  categoryName?: string;
  location: string;
  estimatedValue: number;
  currency?: string;
  deadline?: string;
  status: TenderStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface TenderFilters {
  department?: string;
  category?: string;
  location?: string;
  tenderValue?: string;
  closingDate?: string;
  status?: string;
  search?: string;
}

export interface TenderListResponse {
  data: Tender[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
