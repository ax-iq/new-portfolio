import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import TimelineSeparator from "./TimelineSeparator";

describe("@/components/molecules/TimelineSeparator", () => {
	it("renders its children", async () => {
		const screen = await render(
			<TimelineSeparator>Separator Icon</TimelineSeparator>,
		);
		expect(screen.getByText("Separator Icon")).toBeInTheDocument();
	});
});
