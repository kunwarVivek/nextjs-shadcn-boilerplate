import { db } from "@/lib/db";
import { teams, teamLeads } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

// Validation schema for team data
export const teamSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  members: z.number().int().positive(),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  leadId: z.string().min(1, "Team lead is required"),
});

export type TeamInput = z.infer<typeof teamSchema>;

// Get all teams with optional filtering and pagination
export async function getTeams(
  page = 1,
  limit = 10,
  search?: string,
  organization?: string
) {
  const offset = (page - 1) * limit;
  
  let query = db.select({
    ...teams,
    lead: teamLeads
  })
  .from(teams)
  .leftJoin(teamLeads, eq(teams.leadId, teamLeads.id));
  
  // Apply filters if provided
  if (search) {
    query = query.where(
      like(teams.name, `%${search}%`)
    );
  }
  
  if (organization) {
    query = query.where(eq(teams.organization, organization));
  }
  
  // Get total count for pagination
  const totalQuery = db.select({ count: db.fn.count() }).from(teams);
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

// Get a single team by ID
export async function getTeamById(id: string) {
  const result = await db.select({
    ...teams,
    lead: teamLeads
  })
  .from(teams)
  .leftJoin(teamLeads, eq(teams.leadId, teamLeads.id))
  .where(eq(teams.id, id));
  
  return result[0] || null;
}

// Create a new team
export async function createTeam(data: TeamInput, leadData: any) {
  // Validate input data
  const validatedData = teamSchema.parse(data);
  
  // Generate a unique ID
  const teamId = crypto.randomUUID();
  const leadId = crypto.randomUUID();
  
  // Set default values
  const newTeam = {
    id: teamId,
    ...validatedData,
    leadId: leadId,
    createdAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
  };
  
  // Create team lead
  const newTeamLead = {
    id: leadId,
    teamId: teamId,
    userId: leadData.userId,
    name: leadData.name,
    email: leadData.email,
    avatar: leadData.avatar,
  };
  
  // Use a transaction to ensure both operations succeed or fail together
  await db.transaction(async (tx) => {
    await tx.insert(teams).values(newTeam);
    await tx.insert(teamLeads).values(newTeamLead);
  });
  
  return getTeamById(teamId);
}

// Update an existing team
export async function updateTeam(id: string, data: Partial<TeamInput>) {
  // Validate input data
  const partialSchema = teamSchema.partial();
  const validatedData = partialSchema.parse(data);
  
  await db.update(teams)
    .set(validatedData)
    .where(eq(teams.id, id));
  
  return getTeamById(id);
}

// Delete a team
export async function deleteTeam(id: string) {
  // Use a transaction to delete both team and team lead
  await db.transaction(async (tx) => {
    await tx.delete(teamLeads).where(eq(teamLeads.teamId, id));
    await tx.delete(teams).where(eq(teams.id, id));
  });
  
  return { success: true };
}