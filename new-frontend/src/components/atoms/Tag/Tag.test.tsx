import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Tag from "./Tag";

describe("@/components/atoms/BurgerButton", () => {
	it("renders correctly whith children", () => {
		const label = "#kubernetes";
		render(<Tag label={label} />);

		expect(screen.getByText(`${label}`)).toBeInTheDocument();
	});
});
