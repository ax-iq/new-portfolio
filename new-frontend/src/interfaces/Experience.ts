import type Link from "@/interfaces/Link";
import type Media from "@/interfaces/Media";
import type Tag from "@/interfaces/Tag";

export default interface Experience {
	companyLogo: Media;
	companyName: string;
	description: string;
	endDate: string;
	id: number;
	presentation: string;
	startDate: string;
	tags: Tag[];
	title: string;
	image: Media;
	links: Link[];
}
