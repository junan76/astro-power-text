export const siteConfig = {
	title: "junan",
	description: "Personal technical notes on software engineering.",
	language: "en",
	siteUrl: "https://yourname.github.io",
	basePath: "",
	author: {
		name: "junan",
		bio: "Software engineer writing about web development, tools, and systems.",
		location: "Earth",
		email: "you@example.com",
		github: "https://github.com/yourname",
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
		{ label: "GitHub", href: "https://github.com/yourname" },
		{ label: "RSS", href: "/rss.xml" },
	],
};

export type SiteConfig = typeof siteConfig;
