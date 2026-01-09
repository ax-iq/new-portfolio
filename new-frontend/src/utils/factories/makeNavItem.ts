import type NavItem from "@/interfaces/NavItem";

export default function makeNavItem(overrides: Partial<NavItem>): NavItem {
	return {
		id: overrides.id ?? 0,
		hasSideMenu: overrides.hasSideMenu ?? true,
		icon: overrides.icon ?? "QuestionMarkCircleIcon",
		label: overrides.label ?? "",
		href: overrides.href ?? "",
		isButton: overrides.isButton ?? true,
		alternativeText: overrides.alternativeText ?? "",
	};
}
