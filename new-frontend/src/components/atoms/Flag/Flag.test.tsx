import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Flag from "./Flag";

describe("@/components/atoms/Flag", () => {
	it("displays the flag icon", () => {
		const flagCode = "EN";
		render(<Flag code={flagCode} alt={flagCode} />);
		const component = screen.getByAltText(flagCode);
		expect(component).toBeInTheDocument();
	});
});
