import type React from "react";

interface TimelineProps {
	children: React.ReactNode;
}

export default function Timeline({ children }: TimelineProps) {
	return <section className="flex flex-col gap-2">{children}</section>;
}
