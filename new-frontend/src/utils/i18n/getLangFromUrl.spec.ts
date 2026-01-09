import { describe, expect, it } from "vitest";
import { getLangFromUrl } from "./getLangFromUrl";

describe("@/utils/i18n/getLangFromUrl", () => {
	it("retrives the correct lang", () => {
		const lang = getLangFromUrl(
			new URL("http://dummyserver:4000/fr/experiences"),
		);
		expect(lang).toBe("fr");
	});
	it("retrives the default language if the specified language is not supported", () => {
		const lang = getLangFromUrl(
			new URL("http://dummyserver:4000/zh/experiences"),
		);
		expect(lang).toBe("en");
	});
});
