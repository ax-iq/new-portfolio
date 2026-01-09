export function formatDate(date: string, currentLang: string = "en"): string {
	const _date = new Date(date);
	return _date.toLocaleString(currentLang, { month: "long", year: "numeric" });
}
