CREATE TABLE `subscribers` (
	`email` text PRIMARY KEY NOT NULL,
	`created_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscribers_email_unique` ON `subscribers` (`email`);--> statement-breakpoint
DROP TABLE `emails`;