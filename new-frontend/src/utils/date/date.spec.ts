import { describe, expect, it } from "vitest";
import { formatDate } from "./date";

describe("@/utils/date", () => {
	it("formats the date correctly", () => {
		const formatedDate = formatDate("12/08/2017", "en");
		expect(formatedDate).toBe("December 2017");
	});
});
