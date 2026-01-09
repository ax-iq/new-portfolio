import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import Timeline from "./Timeline";

describe("@/components/organisms/Timeline", () => {
	it("renders its children", async () => {
		const screen = await render(
			<Timeline>
				<div>Content</div>
			</Timeline>,
		);
		expect(screen.getByText("Content")).toBeInTheDocument();
	});
});
