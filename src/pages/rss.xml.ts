import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";
import {
	getPostPath,
	getProjectArticlePath,
	isProjectIndex,
	isPublishedPost,
	sortByDateDesc,
} from "../lib/content";
import { absoluteUrl } from "../lib/url";

const escapeXml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

export async function GET() {
	const regularPosts = (await getCollection("posts")).filter(isPublishedPost).map((post) => ({
		title: post.data.title,
		description: post.data.description,
		date: post.data.date,
		href: getPostPath(post),
	}));
	const projectPosts = (await getCollection("projects"))
		.filter((post) => isPublishedPost(post) && !isProjectIndex(post))
		.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			date: post.data.date,
			href: getProjectArticlePath(post),
		}));
	const posts = sortByDateDesc([...regularPosts, ...projectPosts]).slice(0, 20);

	const items = posts
		.map(
			(post) => `<item>
	<title>${escapeXml(post.title)}</title>
	<link>${absoluteUrl(post.href)}</link>
	<guid>${absoluteUrl(post.href)}</guid>
	<pubDate>${post.date.toUTCString()}</pubDate>
	<description>${escapeXml(post.description)}</description>
</item>`,
		)
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
	<title>${escapeXml(siteConfig.title)}</title>
	<link>${absoluteUrl("/")}</link>
	<description>${escapeXml(siteConfig.description)}</description>
	<language>${siteConfig.language}</language>
${items}
</channel>
</rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
