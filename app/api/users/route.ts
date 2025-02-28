import { NextRequest, NextResponse } from "next/server";
import { getUsers, createUser, userSchema } from "@/lib/api/users";
import { handleApiError, parseQueryParams, validateRequestBody } from "@/lib/utils/api-utils";

// GET /api/users - Get all users with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { page, limit, search } = parseQueryParams(request);
    
    // Get additional filters
    const url = new URL(request.url);
    const role = url.searchParams.get("role") || undefined;
    const status = url.searchParams.get("status") || undefined;
    
    const result = await getUsers(page, limit, search, role, status);
    
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequestBody(request, userSchema);
    
    if (!validation.success) {
      return validation.error;
    }
    
    const newUser = await createUser(validation.data);
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}