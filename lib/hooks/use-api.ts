"use client";

import { useState } from "react";
import { toast } from "sonner";

interface ApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Generic fetch function
  const fetchData = async <R>(
    url: string,
    options?: RequestInit,
    apiOptions?: ApiOptions<R>
  ): Promise<R | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }

      const result = await response.json();
      
      if (apiOptions?.successMessage) {
        toast.success(apiOptions.successMessage);
      }
      
      if (apiOptions?.onSuccess) {
        apiOptions.onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An unknown error occurred");
      setError(error);
      
      if (apiOptions?.errorMessage) {
        toast.error(apiOptions.errorMessage);
      } else {
        toast.error(error.message);
      }
      
      if (apiOptions?.onError) {
        apiOptions.onError(error);
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // GET request
  const get = async <R>(
    url: string,
    apiOptions?: ApiOptions<R>
  ): Promise<R | null> => {
    const result = await fetchData<R>(url, { method: "GET" }, apiOptions);
    if (result) {
      setData(result as unknown as T);
    }
    return result;
  };

  // POST request
  const post = async <R>(
    url: string,
    data: any,
    apiOptions?: ApiOptions<R>
  ): Promise<R | null> => {
    return fetchData<R>(
      url,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      apiOptions
    );
  };

  // PATCH request
  const patch = async <R>(
    url: string,
    data: any,
    apiOptions?: ApiOptions<R>
  ): Promise<R | null> => {
    return fetchData<R>(
      url,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
      apiOptions
    );
  };

  // DELETE request
  const del = async <R>(
    url: string,
    apiOptions?: ApiOptions<R>
  ): Promise<R | null> => {
    return fetchData<R>(url, { method: "DELETE" }, apiOptions);
  };

  return {
    data,
    isLoading,
    error,
    get,
    post,
    patch,
    del,
  };
}