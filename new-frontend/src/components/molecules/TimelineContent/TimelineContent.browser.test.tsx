import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import TimelineContent from "./TimelineContent";

describe("@/components/molecules/TimelineContent", () => {
	it("renders its children", async () => {
		const screen = await render(
			<TimelineContent>
				<div>Content</div>
			</TimelineContent>,
		);
		expect(screen.getByText("Content")).toBeInTheDocument();
	});
});
