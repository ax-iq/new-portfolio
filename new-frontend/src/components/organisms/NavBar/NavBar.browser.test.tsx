import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import makeNavBar from "@/utils/factories/makeNavBar";
import makeNavItem from "@/utils/factories/makeNavItem";
import NavBar from "./NavBar";

describe("@/components/organisms/NavBar", () => {
	// Just tested the navbar display because the Mobile layout is always
	// rendered even if we change the viewport in vitest settings.
	it("displays navbar", async () => {
		const props = {
			navBarData: makeNavBar({
				navItems: [makeNavItem({ id: 0, label: "experiences" })],
			}),
			currentPagePath: "/en/experiences/",
			locale: "en",
		};
		const screen = await render(<NavBar {...props} />);
		expect(screen.getByTestId("navbar")).toBeInTheDocument();
	});
});
