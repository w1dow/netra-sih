
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * A central API client for HTTP communication.
 * This ensures all requests share the same configuration, base URL, and error handling.
 */
class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // Default headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Include credentials (e.g. cookies) for authentication if needed
    const config: RequestInit = {
      ...options,
      headers,
      // credentials: 'include', // Uncomment if backend uses sessions/cookies
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // We throw an object matching our ApiError interface conceptually
        throw {
          status: response.status,
          code: data?.error?.code || 'API_ERROR',
          message: data?.error?.message || data?.message || 'An error occurred',
          details: data?.error?.details || data
        };
      }

      return data;
    } catch (error: any) {
      // In development, log the error clearly as requested
      if (import.meta.env.DEV) {
        console.error('--- API ERROR ---');
        console.error(`Request: ${options.method || 'GET'} ${url}`);
        console.error(`Status: ${error.status || 'Network Error'}`);
        console.error(`Code: ${error.code || 'NETWORK_ERROR'}`);
        console.error(`Message: ${error.message || error.toString()}`);
        console.error('-----------------');
      }
      throw error;
    }
  }

  get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: any, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body: any, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
