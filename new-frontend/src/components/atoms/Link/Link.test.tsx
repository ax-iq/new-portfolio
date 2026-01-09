import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Link from "./Link";

describe("@/components/atoms/Link", () => {
	it("displays a link", () => {
		const label = "Go";
		const href = "/";
		render(<Link href={href} label={label} />);
		const component = screen.getByText(label);
		expect(component).toBeInTheDocument();
	});
});
