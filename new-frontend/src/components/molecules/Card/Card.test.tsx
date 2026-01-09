import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "./Card";

describe("@/components/molecules/Card", () => {
	it("displays the input data", () => {
		const cardData = {
			title: "Title",
			subTitle: "Sub Title",
			tags: [
				{ id: 0, label: "js" },
				{ id: 1, label: "react.js" },
			],
			date: "10/12/2014",
		};
		render(<Card {...cardData}>Main Content</Card>);
		expect(screen.getByText(cardData.title)).toBeInTheDocument();
		expect(screen.getByText(cardData.subTitle)).toBeInTheDocument();
		expect(screen.getByText(`#${cardData.tags[0].label}`)).toBeInTheDocument();
		expect(screen.getByText(`#${cardData.tags[1].label}`)).toBeInTheDocument();
		expect(screen.getByText(cardData.date)).toBeInTheDocument();
	});
});
