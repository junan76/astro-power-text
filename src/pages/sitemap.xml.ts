import { getCollection } from "astro:content";
import {
	getPostPath,
	getProjectArticlePath,
	getProjectPath,
	isProjectIndex,
	isPublishedPost,
	slugifyTag,
} from "../lib/content";
import { absoluteUrl } from "../lib/url";

export async function GET() {
	const posts = (await getCollection("posts")).filter(isPublishedPost);
	const projectEntries = await getCollection("projects");
	const projects = projectEntries.filter(isProjectIndex);
	const projectPosts = projectEntries.filter((post) => isPublishedPost(post) && !isProjectIndex(post));
	const tags = new Set([
		...posts.flatMap((post) => post.data.tags),
		...projectPosts.flatMap((post) => post.data.tags),
	]);

	const paths = [
		"/",
		"/archive/",
		"/tags/",
		"/projects/",
		"/about/",
		...posts.map(getPostPath),
		...projects.map(getProjectPath),
		...projectPosts.map(getProjectArticlePath),
		...[...tags].map((tag) => `/tags/${slugifyTag(tag)}/`),
	];

	const urls = paths
		.map((path) => `<url><loc>${absoluteUrl(path)}</loc></url>`)
		.join("\n");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
}
