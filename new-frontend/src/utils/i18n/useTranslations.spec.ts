import { describe, expect, it } from "vitest";
import { usesTranslations } from "./useTranslations";

describe("@/utils/i18n/usesTranslations", () => {
	it("does the correct translation", () => {
		const t = usesTranslations("fr");
		const translation = t("page.home");
		expect(translation).toBe("Accueil");
	});
});
