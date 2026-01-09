interface TimelineSeparatorProps {
	children: React.ReactNode;
}

export default function TimelineSeparator({
	children,
}: TimelineSeparatorProps) {
	return (
		<div className="flex flex-col items-center gap-2 pr-2 lg:px-4">
			{children}
		</div>
	);
}
