import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BurgerButton from "./BurgerButton";

describe("@/components/atoms/BurgerButton", () => {
	it("calls onClickHandler when clicked", () => {
		const state = Math.random() >= 0.5;
		const onClickHandler = vi.fn();
		render(<BurgerButton isOpen={state} onClickHandler={onClickHandler} />);

		fireEvent.click(screen.getByTestId("burger-button"));

		expect(onClickHandler).toHaveBeenCalledTimes(1);
	});
	// Use Browser Mode to test opened vs closed icon
	it.todo("displays closed icon when clicked");
});
