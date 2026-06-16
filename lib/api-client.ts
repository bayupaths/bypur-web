// Simple API client untuk portfolio pribadi
// Hanya GET request yang dibutuhkan

import axios from "axios";
import { env } from "./env";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * Simple GET request dengan axios
 * Untuk portfolio pribadi, cukup GET saja
 */
export async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  if (!env.apiUrl) {
    return { error: "API URL not configured" };
  }

  try {
    const response = await axios.get<T>(`${env.apiUrl}${endpoint}`, {
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });
    
    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { 
        error: error.response?.data?.message || error.message 
      };
    }
    return { error: "Unknown error" };
  }
}
// Export types
export type { ApiResponse };
