import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import type ProfileBlock from "@/interfaces/ProfileBlock";
import BlockRenderer from "./BlockRenderer";

describe("@/components/organisms/TimelineSeparator", () => {
	it.todo("renders profile block");
	it("do not render profile block yet", async () => {
		const profileBlock: ProfileBlock = {
			__component: "block.profile",
			id: 0,
			description: "profile block description",
			image: {
				id: 0,
				documentId: "id03",
				alternativeText: "",
				name: "imagename",
				url: "https://example.com/image.svg",
			},
		};
		const props = {
			block: profileBlock,
			currentLang: "en",
			backendBaseUrl: "",
		};
		const screen = await render(<BlockRenderer {...props} />);
		expect(screen.getByText(profileBlock.description)).not.toBeInTheDocument();
	});
	it.todo("renders experience grid");
	it.todo("do not render not defined block");
});
