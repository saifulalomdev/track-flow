import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const event = sqliteTable('event', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  // DATA ISOLATION: The owner of the data
  customerId: text('customer_id').notNull(),
  projectId: text('project_id').notNull(),

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
  // The "Super Index" for your dashboard performance
  mainQueryIdx: index('main_query_idx').on(table.customerId, table.projectId, table.timestamp),
  visitorIdx: index('visitor_idx').on(table.visitorId),
}));

