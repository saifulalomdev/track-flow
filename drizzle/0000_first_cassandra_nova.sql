CREATE TABLE `emails` (
	`email` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `emails_email_unique` ON `emails` (`email`);