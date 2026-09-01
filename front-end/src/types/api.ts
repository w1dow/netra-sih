export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    [key: string]: any;
  };
  error?: ApiError;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}
