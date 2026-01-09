import IconButton from "@/components/molecules/IconButton/IconButton";
import type NavItem from "@/interfaces/NavItem";
import type { IconName } from "@/utils/icons";

interface NavBarItemProps {
	item: NavItem;
	// example: en/projects
	currentPagePath: string;
	locale: string;
}

export default function NavBarItem({
	item,
	currentPagePath,
	locale,
}: NavBarItemProps) {
	const href = item.href ? item.href : `/${locale}/`;
	const pageName = item.href ? item.href : "";
	const isActive = currentPagePath === `/${locale}/${pageName}`;

	return (
		<a href={href} data-testid="navbar-item">
			<IconButton
				isActive={isActive}
				icon={item.icon as IconName}
				label={item.label}
			/>
		</a>
	);
}
