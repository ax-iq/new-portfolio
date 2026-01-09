import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Markdown from "./Markdown";

describe("@/components/atoms/Logo", () => {
	it("renders children correctly", () => {
		render(<Markdown>Welcome Home.</Markdown>);
		const component = screen.getByText("Welcome Home.");
		expect(component).toBeInTheDocument();
		expect(component).toBeVisible();
	});
});
