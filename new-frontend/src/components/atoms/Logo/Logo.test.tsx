import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Logo from "./Logo";

describe("@/components/atoms/Logo", () => {
	it("displays a logo", () => {
		// const name = "Company";
		// render(<Logo name={name} />);
		// const component = screen.getByText(name);
		// expect(component).toBeInTheDocument();
		render(<Logo />);
		const component = screen.getByTestId("logo");
		expect(component).toBeInTheDocument();
	});
});
