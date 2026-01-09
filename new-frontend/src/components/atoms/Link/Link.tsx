import clsx from "clsx";

interface LinkProps {
	href: string;
	label: string;
	isActive?: boolean;
	isExternal?: boolean;
	className?: string;
}
export default function Link({
	href,
	label,
	isActive = false,
	isExternal = false,
	className = "",
}: LinkProps) {
	return (
		<a
			href={href}
			target={clsx(isExternal ? "_blank" : "_self")}
			rel={clsx(isExternal ? "noopener noreferrer" : "none")}
			className={clsx(
				" text-primary font-medium rounded p-1",
				"hover:bg-primary hover:text-white transition-all duration-300 ease-in-out",
				isActive ? "bg-primary text-white border" : "bg-none",
				className,
			)}
		>
			{label}
		</a>
	);
}
