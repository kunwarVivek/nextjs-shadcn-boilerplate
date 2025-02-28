import { NextRequest, NextResponse } from "next/server";
import { getOrganizations, createOrganization, organizationSchema } from "@/lib/api/organizations";
import { handleApiError, parseQueryParams, validateRequestBody } from "@/lib/utils/api-utils";

// GET /api/organizations - Get all organizations with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { page, limit, search } = parseQueryParams(request);
    
    // Get additional filters
    const url = new URL(request.url);
    const plan = url.searchParams.get("plan") || undefined;
    const status = url.searchParams.get("status") || undefined;
    
    const result = await getOrganizations(page, limit, search, plan, status);
    
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/organizations - Create a new organization
export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequestBody(request, organizationSchema);
    
    if (!validation.success) {
      return validation.error;
    }
    
    const newOrganization = await createOrganization(validation.data);
    
    return NextResponse.json(newOrganization, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}