import type Media from "@/interfaces/Media";

export default interface ProfileComponent {
	__component: "block.profile";
	id: number;
	description: string;
	image: Media;
}
