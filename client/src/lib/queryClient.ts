/**
 * EDGERACK Cooling Unit Control System - TanStack Query Client Configuration
 * 
 * This file configures the TanStack Query client for efficient server state management.
 * It provides standardized error handling, authentication management, and query functions
 * for all API communications with the cooling unit monitoring backend.
 */

import { QueryClient, QueryFunction } from "@tanstack/react-query";

/**
 * HTTP Response Error Handler
 * 
 * Throws descriptive errors for non-200 HTTP responses, providing better
 * error messages for debugging and user feedback.
 * 
 * @param res - Fetch Response object to validate
 * @throws Error with status code and response text if not OK
 */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * API Request Function
 * 
 * Standardized function for making HTTP requests to the cooling unit API.
 * Automatically includes authentication credentials and proper headers.
 * Used by TanStack Query mutations for POST, PUT, DELETE operations.
 * 
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param url - API endpoint URL
 * @param data - Optional request body data (automatically JSON stringified)
 * @returns Promise resolving to Response object
 * @throws Error for non-200 status codes with descriptive messages
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",  // Include session cookies for authentication
  });

  await throwIfResNotOk(res);
  return res;
}

// Type definition for handling unauthorized responses
type UnauthorizedBehavior = "returnNull" | "throw";

/**
 * Query Function Generator
 * 
 * Creates TanStack Query-compatible query functions with customizable
 * authentication error handling. Used for all GET requests to the cooling
 * unit monitoring API endpoints.
 * 
 * @param options - Configuration object with 401 error behavior
 * @returns Query function that handles HTTP requests and authentication
 */
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",  // Include authentication cookies
    });

    // Handle unauthorized access based on configuration
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

/**
 * TanStack Query Client Instance
 * 
 * Configured query client for the cooling unit monitoring system.
 * Optimized for real-time data with minimal caching and no automatic retries
 * to ensure fresh data and predictable error handling in industrial environments.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),  // Throw auth errors for handling
      refetchInterval: false,                    // No automatic polling (handled explicitly)
      refetchOnWindowFocus: false,              // No refetch on focus change
      staleTime: Infinity,                      // Data never goes stale automatically
      retry: false,                             // No automatic retries for predictable behavior
    },
    mutations: {
      retry: false,                             // No mutation retries to avoid duplicate operations
    },
  },
});
