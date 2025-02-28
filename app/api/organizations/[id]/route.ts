import { NextRequest, NextResponse } from "next/server";
import { getOrganizationById, updateOrganization, deleteOrganization, organizationSchema } from "@/lib/api/organizations";
import { handleApiError, validateRequestBody } from "@/lib/utils/api-utils";

// GET /api/organizations/[id] - Get a single organization by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organization = await getOrganizationById(params.id);
    
    if (!organization) {
      return NextResponse.json(
        { success: false, error: "Organization not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(organization);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/organizations/[id] - Update an organization
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if organization exists
    const existingOrganization = await getOrganizationById(params.id);
    
    if (!existingOrganization) {
      return NextResponse.json(
        { success: false, error: "Organization not found" },
        { status: 404 }
      );
    }
    
    const validation = await validateRequestBody(request, organizationSchema.partial());
    
    if (!validation.success) {
      return validation.error;
    }
    
    const updatedOrganization = await updateOrganization(params.id, validation.data);
    
    return NextResponse.json(updatedOrganization);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/organizations/[id] - Delete an organization
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if organization exists
    const existingOrganization = await getOrganizationById(params.id);
    
    if (!existingOrganization) {
      return NextResponse.json(
        { success: false, error: "Organization not found" },
        { status: 404 }
      );
    }
    
    await deleteOrganization(params.id);
    
    return NextResponse.json(
      { success: true, message: "Organization deleted successfully" }
    );
  } catch (error) {
    return handleApiError(error);
  }
}