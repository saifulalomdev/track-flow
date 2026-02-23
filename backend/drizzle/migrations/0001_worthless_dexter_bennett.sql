PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_site` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text,
	`url` text,
	`is_active` integer DEFAULT true,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_site`("id", "user_id", "title", "url", "is_active", "created_at") SELECT "id", "user_id", "title", "url", "is_active", "created_at" FROM `site`;--> statement-breakpoint
DROP TABLE `site`;--> statement-breakpoint
ALTER TABLE `__new_site` RENAME TO `site`;--> statement-breakpoint
PRAGMA foreign_keys=ON;