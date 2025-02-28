import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

// Validation schema for invoice data
export const invoiceSchema = z.object({
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  amount: z.string(),
  status: z.enum(["Paid", "Unpaid", "Refunded"]),
  date: z.string(),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;

// Get all invoices with optional filtering and pagination
export async function getInvoices(
  page = 1,
  limit = 10,
  search?: string,
  status?: string
) {
  const offset = (page - 1) * limit;
  
  let query = db.select().from(invoices);
  
  // Apply filters if provided
  if (search) {
    query = query.where(
      like(invoices.organization, `%${search}%`)
    );
  }
  
  if (status) {
    query = query.where(eq(invoices.status, status));
  }
  
  // Get total count for pagination
  const totalQuery = db.select({ count: db.fn.count() }).from(invoices);
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

// Get a single invoice by ID
export async function getInvoiceById(id: string) {
  const result = await db.select().from(invoices).where(eq(invoices.id, id));
  return result[0] || null;
}

// Create a new invoice
export async function createInvoice(data: InvoiceInput) {
  // Validate input data
  const validatedData = invoiceSchema.parse(data);
  
  // Generate a unique ID with INV prefix
  const id = `INV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  // Set default values
  const newInvoice = {
    id,
    ...validatedData,
  };
  
  await db.insert(invoices).values(newInvoice);
  return newInvoice;
}

// Update an existing invoice
export async function updateInvoice(id: string, data: Partial<InvoiceInput>) {
  // Validate input data
  const partialSchema = invoiceSchema.partial();
  const validatedData = partialSchema.parse(data);
  
  await db.update(invoices)
    .set(validatedData)
    .where(eq(invoices.id, id));
  
  return getInvoiceById(id);
}

// Delete an invoice
export async function deleteInvoice(id: string) {
  await db.delete(invoices).where(eq(invoices.id, id));
  return { success: true };
}