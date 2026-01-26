import { pgTable, text, timestamp, pgEnum, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active", 
  "canceled", 
  "incomplete", 
  "past_due", 
  "trialing"
]);

export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: uuid("user_id").notNull().references(() => users.id).unique(),
  planId: text("plan_id").notNull(), 
  status: subscriptionStatusEnum("status").notNull().default("incomplete"),
  startDate: timestamp("start_date").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});