import type Experience from "@/interfaces/Experience";

export default interface ExperienceGridComponent {
	__component: "block.experience-grid";
	id: number;
	title: string;
	experiences: Experience[];
}
