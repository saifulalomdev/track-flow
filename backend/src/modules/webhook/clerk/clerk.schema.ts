import { user } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const clerkSchema = createInsertSchema(user).openapi("User");