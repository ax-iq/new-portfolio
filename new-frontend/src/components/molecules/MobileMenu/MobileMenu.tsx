import clsx from "clsx";
import Link from "@/components/atoms/Link/Link";
import type NavItem from "@/interfaces/NavItem";

interface MenuProps {
	items: NavItem[];
	currentPagePath: string;
	isMenuOpen: boolean;
	// example: 'en'
	locale: string;
}

export default function MobileMenu({
	items,
	currentPagePath,
	isMenuOpen,
	locale = "en",
}: MenuProps) {
	return (
		<div
			className={clsx(
				"lg:hidden flex flex-col items-center gap-1 bg-body-bg shadow-sm",
				"overflow-hidden overflow-y-auto",
				"transition-all duration-500 ease-in-out",
				isMenuOpen ? "max-h-screen p-2" : "max-h-0 opacity-0 invisible p-0",
			)}
		>
			{items.map((item) => {
				const href = item.href ? item.href : `/${locale}/`;
				const pageName = item.href ? item.href : "";
				const isLinkActive = currentPagePath === `/${locale}/${pageName}`;

				return (
					<Link
						key={item.id}
						href={href}
						label={item.label}
						isActive={isLinkActive}
						className="w-full text-center text-stone-500"
					/>
				);
			})}
		</div>
	);
}
