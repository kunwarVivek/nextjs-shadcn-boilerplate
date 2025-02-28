import { db } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

// Validation schema for audit log data
export const auditLogSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string().email(),
  userAvatar: z.string().optional(),
  action: z.string(),
  resource: z.string(),
  ipAddress: z.string(),
  timestamp: z.string(),
  status: z.enum(["Success", "Failed"]),
  severity: z.enum(["Info", "Warning", "Critical"]),
});

export type AuditLogInput = z.infer<typeof auditLogSchema>;

// Get all audit logs with optional filtering and pagination
export async function getAuditLogs(
  page = 1,
  limit = 10,
  search?: string,
  severity?: string,
  status?: string
) {
  const offset = (page - 1) * limit;
  
  let query = db.select().from(auditLogs);
  
  // Apply filters if provided
  if (search) {
    query = query.where(
      like(auditLogs.action, `%${search}%`)
    );
  }
  
  if (severity) {
    query = query.where(eq(auditLogs.severity, severity));
  }
  
  if (status) {
    query = query.where(eq(auditLogs.status, status));
  }
  
  // Get total count for pagination
  const totalQuery = db.select({ count: db.fn.count() }).from(auditLogs);
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

// Get a single audit log by ID
export async function getAuditLogById(id: string) {
  const result = await db.select().from(auditLogs).where(eq(auditLogs.id, id));
  return result[0] || null;
}

// Create a new audit log
export async function createAuditLog(data: AuditLogInput) {
  // Validate input data
  const validatedData = auditLogSchema.parse(data);
  
  // Generate a unique ID
  const id = crypto.randomUUID();
  
  // Set default values
  const newAuditLog = {
    id,
    ...validatedData,
  };
  
  await db.insert(auditLogs).values(newAuditLog);
  return newAuditLog;
}

// Audit logs are immutable, so we don't provide update functionality
// Delete an audit log (for admin purposes only)
export async function deleteAuditLog(id: string) {
  await db.delete(auditLogs).where(eq(auditLogs.id, id));
  return { success: true };
}