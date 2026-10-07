CREATE TABLE `reading_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`reading_id` text NOT NULL,
	`parent_id` text,
	`name` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_reading_comments_reading_created` ON `reading_comments` (`reading_id`,`created_at`);