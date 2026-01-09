import IconContainer from "@/components/molecules/IconButton/IconButton";

interface BurgerButtonProps {
	isOpen: boolean;
	onClickHandler: () => void;
}

export default function BurgerButton({
	isOpen,
	onClickHandler,
}: BurgerButtonProps) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: Cannot use button element because child is already a button
		<div
			tabIndex={0}
			role="button"
			className="lg:hidden text-3xl "
			onClick={onClickHandler}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onClickHandler();
				}
			}}
			data-testid="burger-button"
		>
			{isOpen ? (
				<IconContainer icon="XMarkIcon" data-testid="opened" />
			) : (
				<IconContainer icon="Bars3Icon" data-testid="closed" />
			)}
		</div>
	);
}
