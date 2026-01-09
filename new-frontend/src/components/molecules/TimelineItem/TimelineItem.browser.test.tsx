import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import TimelineContent from "@/components/molecules/TimelineContent/TimelineContent";
import TimelineContentOpposite from "@/components/molecules/TimelineContentOpposite/TimelineContentOpposite";
import TimelineSeparator from "@/components/molecules/TimelineSeparator/TimelineSeparator";
import TimelineItem from "./TimelineItem";

describe("@/components/molecules/TimelineItem", () => {
	it("renders specific children types", async () => {
		const screen = await render(
			<TimelineItem>
				<TimelineContentOpposite>Opposite</TimelineContentOpposite>
				<TimelineSeparator>Separator Icon</TimelineSeparator>
				<TimelineContent>Content</TimelineContent>
			</TimelineItem>,
		);
		expect(screen.getByText("Opposite")).toBeInTheDocument();
		expect(screen.getByText("Separator Icon")).toBeInTheDocument();
		expect(screen.getByText("Content")).toBeInTheDocument();
	});
	it("does not render all type of children", async () => {
		const screen = await render(
			<TimelineItem>
				<div>Content</div>
			</TimelineItem>,
		);
		expect(screen.getByText("Content")).not.toBeInTheDocument();
	});
});
