import { describe, expect, it } from "vitest";
import makeNavItem from "./makeNavItem";

describe("@/utils/factories/makeNavItem.ts", () => {
	it("applies correctly the input", () => {
		const id = 103;
		const navItem = makeNavItem({ id: id });
		expect(navItem.id).toBe(id);
	});
});
