import { defaultLang, ui } from "@/utils/i18n/ui";

export function getLangFromUrl(url: URL) {
	const lang = url.pathname.split("/")[1];
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}
