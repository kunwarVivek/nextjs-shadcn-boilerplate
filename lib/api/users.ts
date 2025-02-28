import { getDbConnection } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

// Validation schema for user data
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Admin", "Manager", "User"]),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  status: z.enum(["Active", "Inactive", "Suspended"]),
  avatar: z.string().optional(),
});

export type UserInput = z.infer<typeof userSchema>;

// Get all users with optional filtering and pagination
export async function getUsers(
  page = 1,
  limit = 10,
  search?: string,
  role?: string,
  status?: string
) {
  const offset = (page - 1) * limit;
  const db = await getDbConnection();
  
  let query = db.select().from(users);
  
  // Apply filters if provided
  if (search) {
    query = query.where(
      like(users.name, `%${search}%`)
    );
  }
  
  if (role) {
    query = query.where(eq(users.role, role));
  }
  
  if (status) {
    query = query.where(eq(users.status, status));
  }
  
  // Get total count for pagination
  const totalQuery = db.select({ count: db.fn.count() }).from(users);
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

// Get a single user by ID
export async function getUserById(id: string) {
  const db = await getDbConnection();
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0] || null;
}

// Create a new user
export async function createUser(data: UserInput) {
  const db = await getDbConnection();
  
  // Validate input data
  const validatedData = userSchema.parse(data);
  
  // Generate a unique ID
  const id = crypto.randomUUID();
  
  // Set default values
  const newUser = {
    id,
    ...validatedData,
    lastActive: "Just now",
    createdAt: new Date().toISOString(),
  };
  
  await db.insert(users).values(newUser);
  return newUser;
}

// Update an existing user
export async function updateUser(id: string, data: Partial<UserInput>) {
  const db = await getDbConnection();
  
  // Validate input data
  const partialSchema = userSchema.partial();
  const validatedData = partialSchema.parse(data);
  
  await db.update(users)
    .set(validatedData)
    .where(eq(users.id, id));
  
  return getUserById(id);
}

// Delete a user
export async function deleteUser(id: string) {
  const db = await getDbConnection();
  await db.delete(users).where(eq(users.id, id));
  return { success: true };
}