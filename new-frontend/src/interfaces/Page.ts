import type { Block } from "@/interfaces/Block";

export default interface Page {
	id: number;
	documentId: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	title: string;
	description: string;
	slug: string;
	blocks: Block[];
}
