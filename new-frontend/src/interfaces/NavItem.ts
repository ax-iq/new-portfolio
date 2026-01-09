export default interface NavItem {
	id: number;
	hasSideMenu: boolean;
	icon: string;
	label: string;
	href: string;
	isButton: boolean;
	alternativeText: string;
}
