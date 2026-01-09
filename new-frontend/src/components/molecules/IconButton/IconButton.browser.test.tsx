import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import type { IconName } from "@/utils/icons";
import IconButton from "./IconButton";

describe("@/components/molecules/IconContainer", () => {
	it("displays the side info on focus", async () => {
		const props = {
			isActive: false,
			icon: "PhoneIcon" as IconName,
			label: "Contact",
		};
		const screen = await render(
			<IconButton {...props}>
				<div>Content</div>
			</IconButton>,
		);
		await screen.getByTestId("icon-button").click();
		const sideInfo = screen.getByText(props.label);
		expect(sideInfo).toBeVisible();
		expect(screen.getByText("Content")).toBeInTheDocument();
	});
});
