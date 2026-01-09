import type Media from "@/interfaces/Media";

export default interface Link {
	id: number;
	icon: Media;
	label: string;
	href: string;
	isButton: boolean;
}
