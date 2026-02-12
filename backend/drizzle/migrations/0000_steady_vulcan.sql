CREATE TABLE `event` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_id` text NOT NULL,
	`project_id` text NOT NULL,
	`visitor_id` text NOT NULL,
	`path` text DEFAULT '/' NOT NULL,
	`referrer` text,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`country` text,
	`city` text,
	`screen_width` integer,
	`language` text,
	`timestamp` text DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE INDEX `main_query_idx` ON `event` (`customer_id`,`project_id`,`timestamp`);--> statement-breakpoint
CREATE INDEX `visitor_idx` ON `event` (`visitor_id`);