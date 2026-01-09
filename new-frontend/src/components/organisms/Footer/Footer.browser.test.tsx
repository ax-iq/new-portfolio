import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import Footer from "./Footer";

describe("@/components/organisms/Footer", () => {
	it("renders its children", async () => {
		const props = {
			footerData: {
				id: 0,
				copyright: "2025",
				links: [
					{
						id: 0,
						icon: {
							id: 0,
							documentId: "id03",
							alternativeText: "",
							name: "imagename",
							url: "https://example.com/image.svg",
						},
						label: "linkedin",
						href: "https://linkedin.com",
						isButton: true,
					},
					{
						id: 1,
						icon: {
							id: 1,
							documentId: "id034",
							alternativeText: "",
							name: "imagename",
							url: "https://example.com/image2.svg",
						},
						label: "github",
						href: "https://github.com",
						isButton: true,
					},
				],
			},
		};
		const screen = await render(<Footer {...props} />);
		expect(
			screen.getByText(props.footerData.links[0].label),
		).toBeInTheDocument();
		expect(
			screen.getByText(props.footerData.links[1].label),
		).toBeInTheDocument();
	});
});
