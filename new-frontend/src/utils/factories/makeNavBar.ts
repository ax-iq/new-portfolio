import type NavBar from "@/interfaces/NavBar";
import makeMedia from "./makeMedia";
import makeNavItem from "./makeNavItem";

export default function makeNavBar(overrides: Partial<NavBar>): NavBar {
	return {
		id: overrides.id ?? 0,
		logo: overrides.logo ?? makeMedia({}),
		navItems: overrides.navItems ?? [
			makeNavItem({ id: 0 }),
			makeNavItem({ id: 1 }),
		],
	};
}
