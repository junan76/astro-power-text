import { siteConfig } from "../config/site";

export const withBase = (path: string) => {
	if (path.startsWith("http")) return path;
	const base = siteConfig.basePath.replace(/\/$/, "");
	return `${base}${path}`;
};

export const absoluteUrl = (path: string) => new URL(withBase(path), siteConfig.siteUrl).toString();
