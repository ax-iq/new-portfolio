import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import type { FlagCode } from "@/utils/flags";
import LangSwitch from "./LangSwitch";

describe("@/components/molecules/LangSwitch", () => {
	it("displays the flag codes on click", async () => {
		const props = {
			flagCodes: ["EN", "FR"] as FlagCode[],
			currentLocale: "en",
			currentPagePath: "/en/projects",
		};
		const screen = await render(<LangSwitch {...props} />);
		await screen.getByTestId("icon-button").click();
		expect(screen.getByText(props.flagCodes[0])).toBeVisible();
		expect(screen.getByText(props.flagCodes[1])).toBeVisible();
	});
});
