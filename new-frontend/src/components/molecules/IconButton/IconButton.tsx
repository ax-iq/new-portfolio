import clsx from "clsx";
import type { ReactNode } from "react";
import DynamicIcon from "@/components/atoms/DynamicIcon/DynamicIcon";
import type { FlagCode } from "@/utils/flags";
import type { IconName } from "@/utils/icons";

interface IconContainerProps {
	isActive?: boolean;
	icon: IconName | FlagCode;
	label?: string;
	children?: ReactNode;
}

// It is a button because it needs to be interactive on mobile
export default function IconButton({
	isActive = false,
	icon,
	label = "",
	children,
}: IconContainerProps) {
	return (
		<button
			type="button"
			data-testid="icon-button"
			className={clsx(
				"flex flex-row items-center group",
				"border-r-2 lg:p-2 relative",
				isActive
					? "border-primary bg-primary-bg"
					: "border-secondary lg:hover:bg-primary-bg cursor-pointer",
			)}
		>
			<div
				className={clsx(
					"rounded-sm  p-1 lg:hover:bg-primary-bg ",
					isActive
						? "bg-blue-50 border border-primary"
						: "bg-stone-100 border border-stone-300",
					"transition-all duration-300 ease-linear",
				)}
			>
				<DynamicIcon
					name={icon as IconName}
					className={clsx(
						"size-7",
						isActive ? "text-primary" : "text-stone-300 lg:hover:text-primary",
						"transition-all duration-300 ease-linear",
					)}
				/>
			</div>
			<div
				data-testid="side-info"
				className={clsx(
					"absolute top-[calc(100%)] lg:top-auto lg:left-[calc(100%)] bg-none lg:p-2 lg:-z-10 transition-all duration-300 ease-linear",
					"hidden group-focus-within:block lg:group-hover:block",
				)}
			>
				<div
					className={clsx(
						"bg-white text-sm font-serif text-body rounded flex flex-col gap-1",
						label || children ? "p-2" : "p-0",
					)}
				>
					{label ? label : null}
					{children ? children : null}
				</div>
			</div>
		</button>
	);
}
