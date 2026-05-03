export const siteConfig = {
	title: "junan",
	description: "Personal technical notes on software engineering.",
	language: "en",
	author: {
		name: "junan",
		bio: "Software engineer writing about web development, tools, and systems.",
	},
	nav: [
		{ label: "archive", href: "/archive/" },
		{ label: "tags", href: "/tags/" },
		{ label: "projects", href: "/projects/" },
		{ label: "about", href: "/about/" },
	],
	home: {
		featuredPostCount: 3,
		recentPostCount: 5,
	},
	socialLinks: [
		{ label: "GitHub", href: "https://github.com/junan76" },
		{ label: "RSS", href: "/rss.xml" },
	],
};

export type SiteConfig = typeof siteConfig;
