PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_event` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
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
	`timestamp` text DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`project_id`) REFERENCES `website`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_event`("id", "user_id", "project_id", "visitor_id", "path", "referrer", "utm_source", "utm_medium", "utm_campaign", "country", "city", "screen_width", "language", "timestamp") SELECT "id", "user_id", "project_id", "visitor_id", "path", "referrer", "utm_source", "utm_medium", "utm_campaign", "country", "city", "screen_width", "language", "timestamp" FROM `event`;--> statement-breakpoint
DROP TABLE `event`;--> statement-breakpoint
ALTER TABLE `__new_event` RENAME TO `event`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `main_query_idx` ON `event` (`user_id`,`project_id`,`timestamp`);--> statement-breakpoint
CREATE INDEX `visitor_idx` ON `event` (`visitor_id`);--> statement-breakpoint
ALTER TABLE `user` ADD `email` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);