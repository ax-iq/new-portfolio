import { describe, expect, it } from "vitest";
import makeNavBar from "./makeNavBar";

describe("@/utils/factories/makeNavBar.ts", () => {
	it("applies correctly the input", () => {
		const id = 103;
		const navBarData = makeNavBar({ id: id });
		expect(navBarData.id).toBe(id);
	});
});
