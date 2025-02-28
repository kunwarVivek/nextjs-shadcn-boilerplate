import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Helper function to handle API errors
export function handleApiError(error: unknown) {
  console.error("API Error:", error);
  
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { 
        success: false, 
        error: "Validation error", 
        details: error.errors 
      }, 
      { status: 400 }
    );
  }
  
  if (error instanceof Error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      }, 
      { status: 500 }
    );
  }
  
  return NextResponse.json(
    { 
      success: false, 
      error: "An unknown error occurred" 
    }, 
    { status: 500 }
  );
}

// Helper function to parse query parameters
export function parseQueryParams(request: NextRequest) {
  const url = new URL(request.url);
  
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  const search = url.searchParams.get("search") || undefined;
  
  return {
    page: page ? parseInt(page, 10) : 1,
    limit: limit ? parseInt(limit, 10) : 10,
    search,
  };
}

// Helper function to validate request body
export async function validateRequestBody<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: NextResponse }> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: handleApiError(error) };
  }
}