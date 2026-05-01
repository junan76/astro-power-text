import type { CollectionEntry } from "astro:content";

export type PostEntry = CollectionEntry<"posts">;
export type ProjectEntry = CollectionEntry<"projects">;

export const isPublishedPost = <T extends { data: { draft?: boolean }; id: string }>(entry: T) =>
	!entry.data.draft && !entry.id.endsWith("/index");

export const isProjectIndex = (entry: ProjectEntry) =>
	entry.filePath?.replace(/\\/g, "/").endsWith("/index.md") ||
	entry.filePath?.replace(/\\/g, "/").endsWith("/index.mdx") ||
	!entry.id.includes("/");

export const getProjectSlug = (entry: ProjectEntry) => entry.id.split("/")[0];

export const getProjectPostSlug = (entry: ProjectEntry) => entry.id.replace(/\.mdx?$/, "");

type DatedEntry = { data: { date: Date } } | { date: Date };

const getDateValue = (entry: DatedEntry) => ("data" in entry ? entry.data.date : entry.date).valueOf();

export const sortByDateDesc = <T extends DatedEntry>(entries: T[]) =>
	entries.sort((a, b) => getDateValue(b) - getDateValue(a));

export const formatDate = (date: Date) =>
	new Intl.DateTimeFormat("en", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	}).format(date);

export const formatCompactDate = (date: Date) =>
	new Intl.DateTimeFormat("en-CA", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date);

export const slugifyTag = (tag: string) =>
	tag
		.toLowerCase()
		.trim()
		.replace(/&/g, "and")
		.replace(/[^\p{Letter}\p{Number}]+/gu, "-")
		.replace(/^-+|-+$/g, "");

export const getPostPath = (entry: PostEntry) => `/posts/${entry.id.replace(/\.mdx?$/, "")}/`;

export const getProjectPath = (entry: ProjectEntry) => `/projects/${getProjectSlug(entry)}/`;

export const getProjectArticlePath = (entry: ProjectEntry) =>
	`/projects/${entry.id.replace(/\.mdx?$/, "")}/`;
