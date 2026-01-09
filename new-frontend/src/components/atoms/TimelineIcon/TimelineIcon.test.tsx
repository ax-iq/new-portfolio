import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TimelineIcon from "./TimelineIcon";

describe("@/components/atoms/TimelineIcon", () => {
	it("renders image with correct src and alt", () => {
		const src = "/test-image.svg";
		render(<TimelineIcon src={src} />);
		const component = screen.getByRole("img");
		expect(component).toBeInTheDocument();
		expect(component).toHaveAttribute("src", src);
		expect(component).toHaveAttribute("alt", "Timeline Icon");
	});
});
