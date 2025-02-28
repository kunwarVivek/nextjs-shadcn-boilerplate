import { db } from "@/lib/db";
import { organizationMembers } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

// Validation schema for organization member data
export const organizationMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Admin", "Manager", "User"]),
  department: z.string(),
  status: z.enum(["Active", "Inactive", "Suspended"]),
  avatar: z.string().optional(),
  organizationId: z.string(),
});

export type OrganizationMemberInput = z.infer<typeof organizationMemberSchema>;

// Get all organization members with optional filtering and pagination
export async function getOrganizationMembers(
  page = 1,
  limit = 10,
  search?: string,
  role?: string,
  department?: string,
  status?: string,
  organizationId?: string
) {
  const offset = (page - 1) * limit;
  
  let query = db.select().from(organizationMembers);
  
  // Apply filters if provided
  if (search) {
    query = query.where(
      like(organizationMembers.name, `%${search}%`)
    );
  }
  
  if (role) {
    query = query.where(eq(organizationMembers.role, role));
  }
  
  if (department) {
    query = query.where(eq(organizationMembers.department, department));
  }
  
  if (status) {
    query = query.where(eq(organizationMembers.status, status));
  }
  
  if (organizationId) {
    query = query.where(eq(organizationMembers.organizationId, organizationId));
  }
  
  // Get total count for pagination
  const totalQuery = db.select({ count: db.fn.count() }).from(organizationMembers);
  const [{ count }] = await totalQuery;
  
  // Apply pagination
  const results = await query.limit(limit).offset(offset);
  
  return {
    data: results,
    pagination: {
      total: Number(count),
      page,
      limit,
      totalPages: Math.ceil(Number(count) / limit),
    },
  };
}

// Get a single organization member by ID
export async function getOrganizationMemberById(id: string) {
  const result = await db.select().from(organizationMembers).where(eq(organizationMembers.id, id));
  return result[0] || null;
}

// Create a new organization member
export async function createOrganizationMember(data: OrganizationMemberInput) {
  // Validate input data
  const validatedData = organizationMemberSchema.parse(data);
  
  // Generate a unique ID
  const id = crypto.randomUUID();
  
  // Set default values
  const newMember = {
    id,
    ...validatedData,
    lastActive: "Just now",
  };
  
  await db.insert(organizationMembers).values(newMember);
  return newMember;
}

// Update an existing organization member
export async function updateOrganizationMember(id: string, data: Partial<OrganizationMemberInput>) {
  // Validate input data
  const partialSchema = organizationMemberSchema.partial();
  const validatedData = partialSchema.parse(data);
  
  await db.update(organizationMembers)
    .set(validatedData)
    .where(eq(organizationMembers.id, id));
  
  return getOrganizationMemberById(id);
}

// Delete an organization member
export async function deleteOrganizationMember(id: string) {
  await db.delete(organizationMembers).where(eq(organizationMembers.id, id));
  return { success: true };
}