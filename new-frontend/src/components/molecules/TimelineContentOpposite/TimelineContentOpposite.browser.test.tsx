import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import TimelineContentOpposite from "./TimelineContentOpposite";

describe("@/components/molecules/TimelineContentOpposite", () => {
	it("renders its children", async () => {
		const screen = await render(
			<TimelineContentOpposite>
				<div>Content Opposite</div>
			</TimelineContentOpposite>,
		);
		expect(screen.getByText("Content Opposite")).toBeInTheDocument();
	});
});
