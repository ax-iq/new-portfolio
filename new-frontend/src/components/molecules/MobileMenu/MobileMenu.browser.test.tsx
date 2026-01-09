import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import MobileMenu from "./MobileMenu";

describe("@/components/molecules/MobileMenu", () => {
	const props = {
		items: [
			{
				id: 0,
				hasSideMenu: true,
				icon: "BriefcaseIcon",
				label: "experiences",
				href: "/en/experiences/",
				isButton: true,
				alternativeText: "experiences",
			},
			{
				id: 1,
				hasSideMenu: true,
				icon: "BookOpenIcon",
				label: "education",
				href: "/en/education/",
				isButton: true,
				alternativeText: "education",
			},
		],
		currentPagePath: "/en/projects",
		isMenuOpen: true,
		locale: "en",
	};

	it("displays the items when the menu is open", async () => {
		const screen = await render(<MobileMenu {...props} />);
		expect(screen.getByText(props.items[0].label)).toBeVisible();
		expect(screen.getByText(props.items[1].label)).toBeVisible();
	});

	it("does not display the items when the menu is closed", async () => {
		const screen = await render(<MobileMenu {...props} isMenuOpen={false} />);
		expect(screen.getByText(props.items[0].label)).not.toBeVisible();
		expect(screen.getByText(props.items[1].label)).not.toBeVisible();
	});
});
