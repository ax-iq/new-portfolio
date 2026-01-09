import type Media from "@/interfaces/Media";
import type NavItem from "@/interfaces/NavItem";

export default interface NavBar {
	id: number;
	logo: Media;
	navItems: NavItem[];
}
