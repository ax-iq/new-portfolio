import type Media from "@/interfaces/Media";

export default interface Seo {
	id: number;
	metaTitle: string;
	metaDescription: string;
	shareImage: Media;
	siteUrl: string;
}
