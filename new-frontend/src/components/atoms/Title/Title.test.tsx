import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Title from "./Title";

describe("@/components/atoms/Title", () => {
	it("displays correct title", () => {
		const label = "Skills";
		render(<Title label={label} />);
		const component = screen.getByText(label);
		expect(component).toBeInTheDocument();
		expect(component).toBeVisible();
	});
});
