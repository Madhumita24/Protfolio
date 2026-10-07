CREATE TABLE `portfolio_content` (
	`id` text PRIMARY KEY NOT NULL,
	`draft` text NOT NULL,
	`published` text,
	`revision` integer NOT NULL,
	`published_at` text
);
