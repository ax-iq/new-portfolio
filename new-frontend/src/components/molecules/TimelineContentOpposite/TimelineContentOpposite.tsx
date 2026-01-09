import type React from "react";

interface TimelineContentOppositeProps {
	children: React.ReactNode;
}

export default function TimelineContentOpposite({
	children,
}: TimelineContentOppositeProps) {
	return (
		<div className="hidden group-even:justify-end lg:flex lg:flex-row flex-1 py-4">
			{children}
		</div>
	);
}
