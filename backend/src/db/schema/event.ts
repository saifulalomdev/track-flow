import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { user } from './user';
import { website } from './website';

export const event = sqliteTable('event', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // DATA ISOLATION: The owner of the data
  userId: text('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
  projectId: text('project_id').references(() => website.id, { onDelete: "cascade" }).notNull(),

  visitorId: text('visitor_id').notNull(),
  path: text('path').notNull().default('/'),
  referrer: text('referrer'),

  // Marketing & Geo
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  country: text('country'),
  city: text('city'),

  // Screen Metadata for "Elegant" breakdowns
  screenWidth: integer('screen_width'),
  language: text('language'),

  timestamp: text("timestamp").default(sql`(strftime('%s', 'now'))`)
}, (table) => ({
  mainQueryIdx: index('main_query_idx').on(table.userId, table.projectId, table.timestamp),
  visitorIdx: index('visitor_idx').on(table.visitorId),
}));

