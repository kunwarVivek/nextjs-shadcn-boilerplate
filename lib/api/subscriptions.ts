import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import { z } from "zod";

// Validation schema for subscription data
export const subscriptionSchema = z.object({
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  plan: z.enum(["Enterprise", "Business", "Starter"]),
  status: z.enum(["Active
  ]
  )
}
)