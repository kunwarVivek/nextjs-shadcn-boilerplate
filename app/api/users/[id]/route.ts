import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser, userSchema } from "@/lib/api/users";
import { handleApiError, validateRequestBody } from "@/lib/utils/api-utils";

// GET /api/users/[id] - Get a single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserById(params.id);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/users/[id] - Update a user
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user exists
    const existingUser = await getUserById(params.id);
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    
    const validation = await validateRequestBody(request, userSchema.partial());
    
    if (!validation.success) {
      return validation.error;
    }
    
    const updatedUser = await updateUser(params.id, validation.data);
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user exists
    const existingUser = await getUserById(params.id);
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    
    await deleteUser(params.id);
    
    return NextResponse.json(
      { success: true, message: "User deleted successfully" }
    );
  } catch (error) {
    return handleApiError(error);
  }
}