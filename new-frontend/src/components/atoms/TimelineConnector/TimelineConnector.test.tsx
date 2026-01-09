import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TimelineConnector from "./TimelineConnector";

describe("@/components/atoms/TimelineConnector", () => {
	it("renders correctly", () => {
		render(<TimelineConnector />);
		const component = screen.getByTestId("timeline-connector");
		expect(component).toBeInTheDocument();
	});
});
