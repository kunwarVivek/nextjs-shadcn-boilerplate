import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

// Users table
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("User"),
  organization: text("organization").notNull(),
  status: text("status").notNull().default("Active"),
  lastActive: text("last_active").notNull(),
  avatar: text("avatar"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Organizations table
export const organizations = sqliteTable("organizations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  domain: text("domain").notNull().unique(),
  plan: text("plan").notNull(),
  users: integer("users").notNull(),
  status: text("status").notNull().default("Active"),
  createdAt: text("created_at").notNull(),
});

// Teams table
export const teams = sqliteTable("teams", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  members: integer("members").notNull(),
  organization: text("organization").notNull(),
  leadId: text("lead_id").notNull(),
  createdAt: text("created_at").notNull(),
});

// Team leads (for joining with users)
export const teamLeads = sqliteTable("team_leads", {
  id: text("id").primaryKey(),
  teamId: text("team_id").notNull().references(() => teams.id),
  userId: text("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  avatar: text("avatar"),
});

// Subscriptions table
export const subscriptions = sqliteTable("subscriptions", {
  id: text("id").primaryKey(),
  organization: text("organization").notNull(),
  plan: text("plan").notNull(),
  status: text("status").notNull().default("Active"),
  amount: text("amount").notNull(),
  billingCycle: text("billing_cycle").notNull(),
  nextBilling: text("next_billing").notNull(),
  paymentMethod: text("payment_method").notNull(),
});

// Invoices table
export const invoices = sqliteTable("invoices", {
  id: text("id").primaryKey(),
  organization: text("organization").notNull(),
  amount: text("amount").notNull(),
  status: text("status").notNull(),
  date: text("date").notNull(),
});

// Audit logs table
export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  userName: text("user_name").notNull(),
  userEmail: text("user_email").notNull(),
  userAvatar: text("user_avatar"),
  action: text("action").notNull(),
  resource: text("resource").notNull(),
  ipAddress: text("ip_address").notNull(),
  timestamp: text("timestamp").notNull(),
  status: text("status").notNull(),
  severity: text("severity").notNull(),
});

// Organization members table
export const organizationMembers = sqliteTable("organization_members", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  department: text("department").notNull(),
  status: text("status").notNull().default("Active"),
  lastActive: text("last_active").notNull(),
  avatar: text("avatar"),
  organizationId: text("organization_id").notNull().references(() => organizations.id),
});