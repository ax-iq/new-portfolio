import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DynamicIcon from "./DynamicIcon";

describe("@/components/atoms/DynamicIcon", () => {
	it("displays the correct icon", () => {
		const name = "HomeIcon";
		const className = "size-5";
		render(<DynamicIcon name={name} className={className} />);
		const component = screen.getByTestId("icon");
		expect(component).toHaveAttribute("aria-label", name);
		expect(component).toHaveAttribute("class", className);
	});
});
