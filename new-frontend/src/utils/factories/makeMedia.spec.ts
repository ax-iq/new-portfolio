import { describe, expect, it } from "vitest";
import makeMedia from "./makeMedia";

describe("@/utils/factories/makeMedia.ts", () => {
	it("applies correctly the input", () => {
		const id = 103;
		const media = makeMedia({ id: id });
		expect(media.id).toBe(id);
	});
});
