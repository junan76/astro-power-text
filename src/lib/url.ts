const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const site = import.meta.env.SITE;

export const withBase = (path: string) => {
	if (path.startsWith("http")) return path;
	return `${base}${path}`;
};

export const absoluteUrl = (path: string) => new URL(withBase(path), site).toString();
