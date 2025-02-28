import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

// Validation schema for organization data
export const organizationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  domain: z.string().min(3, "Domain must be at least 3 characters"),
  plan: z.enum(["Enterprise", "Business", "Starter"]),
  users: z.number().int().positive(),
  status: z.enum(["Active", "Inactive"]),
});

export type OrganizationInput = z.infer<typeof organizationSchema>;

// Get all organizations with optional filtering and pagination
export async function getOrganizations(
  page = 1,
  limit = 10,
  search?: string,
  plan?: string,
  status?: string
) {
  const offset = (page - 1) * limit;
  
  let query = db.select().from(organizations);
  
  // Apply filters if provided
  if (search) {
    query = query.where(
      like(organizations.name, `%${search}%`)
    );
  }
  
  if (plan) {
    query = query.where(eq(organizations.plan, plan));
  }
  
  if (status) {
    query = query.where(eq(organizations.status, status));
  }
  
  // Get total count for pagination
  const totalQuery = db.select({ count: db.fn.count() }).from(organizations);
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

// Get a single organization by ID
export async function getOrganizationById(id: string) {
  const result = await db.select().from(organizations).where(eq(organizations.id, id));
  return result[0] || null;
}

// Create a new organization
export async function createOrganization(data: OrganizationInput) {
  // Validate input data
  const validatedData = organizationSchema.parse(data);
  
  // Generate a unique ID
  const id = crypto.randomUUID();
  
  // Set default values
  const newOrganization = {
    id,
    ...validatedData,
    createdAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
  };
  
  await db.insert(organizations).values(newOrganization);
  return newOrganization;
}

// Update an existing organization
export async function updateOrganization(id: string, data: Partial<OrganizationInput>) {
  // Validate input data
  const partialSchema = organizationSchema.partial();
  const validatedData = partialSchema.parse(data);
  
  await db.update(organizations)
    .set(validatedData)
    .where(eq(organizations.id, id));
  
  return getOrganizationById(id);
}

// Delete an organization
export async function deleteOrganization(id: string) {
  await db.delete(organizations).where(eq(organizations.id, id));
  return { success: true };
}