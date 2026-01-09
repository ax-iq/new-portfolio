import clsx from "clsx";
import type React from "react";

interface TimelineContentProps {
	children: React.ReactNode;
}

function SideTriangle() {
	return (
		<div className="absolute lg:group-odd:-right-5 lg:group-even:-left-5 max-lg:-left-2 max-lg:top-3 -z-10 lg:top-5  drop-shadow inline-block">
			<div
				className={clsx(
					"w-0 h-0",
					"max-lg:border-r-20 max-lg:border-r-white",
					"max-lg:border-t-10 max-lg:border-t-transparent",
					"max-lg:border-b-10 max-lg:border-b-transparent",

					"lg:group-odd:border-t-10 lg:group-odd:border-t-transparent",
					"lg:group-odd:border-l-20 lg:group-odd:border-l-white ",
					"lg:group-odd:border-b-10 lg:group-odd:border-b-transparent",

					"lg:group-even:border-r-20 lg:group-even:border-r-white",
					"lg:group-even:border-t-10 lg:group-even:border-t-transparent",
					"lg:group-even:border-b-10 lg:group-even:border-b-transparent",
				)}
			></div>
		</div>
	);
}

export default function TimelineContent({ children }: TimelineContentProps) {
	return (
		<div className="flex flex-col flex-1 relative shadow-sm">
			<SideTriangle />
			{children}
		</div>
	);
}
