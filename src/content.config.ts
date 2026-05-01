import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.coerce.date(),
	updated: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	featured: z.boolean().default(false),
	draft: z.boolean().default(false),
});

const posts = defineCollection({
	loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
	schema: postSchema,
});

const projects = defineCollection({
	loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
	schema: postSchema.extend({
		status: z.enum(["active", "paused", "completed", "archived"]).optional(),
		repository: z.string().url().optional(),
		website: z.string().url().optional(),
	}),
});

export const collections = { posts, projects };
