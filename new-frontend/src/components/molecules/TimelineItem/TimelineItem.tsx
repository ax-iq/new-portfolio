import React from "react";
import TimelineContent from "@/components/molecules/TimelineContent/TimelineContent";
import TimelineContentOpposite from "@/components/molecules/TimelineContentOpposite/TimelineContentOpposite";
import TimelineSeparator from "@/components/molecules/TimelineSeparator/TimelineSeparator";

interface TimelineItemProps {
	children: React.ReactNode;
}

function findChildByType<T extends React.ReactElement>(
	children: React.ReactNode,
	type: React.ElementType,
): T | undefined {
	const childArray = React.Children.toArray(children);
	return childArray.find(
		(child): child is T => React.isValidElement(child) && child.type === type,
	);
}

export default function TimelineItem({ children }: TimelineItemProps) {
	const timelineContentOpposite = findChildByType<React.ReactElement>(
		children,
		TimelineContentOpposite,
	);

	const timelineContent = findChildByType<React.ReactElement>(
		children,
		TimelineContent,
	);

	const timelineSeparator = findChildByType<React.ReactElement>(
		children,
		TimelineSeparator,
	);

	return (
		<div className="group flex flex-row lg:odd:flex-row-reverse lg:gap-4">
			{timelineContentOpposite}
			{timelineSeparator}
			{timelineContent}
		</div>
	);
}
