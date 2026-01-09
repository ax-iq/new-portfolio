import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import NavBarItem from "./NavBarItem";

describe("@/components/molecules/NavBarItem", () => {
	it("displays the item", async () => {
		const props = {
			item: {
				id: 0,
				hasSideMenu: true,
				icon: "BriefcaseIcon",
				label: "experiences",
				href: "/en/experiences/",
				isButton: true,
				alternativeText: "experiences",
			},
			currentPagePath: "/en/projects",
			locale: "en",
		};
		const screen = await render(<NavBarItem {...props} />);
		expect(screen.getByTestId("navbar-item")).toBeInTheDocument();
	});
});
