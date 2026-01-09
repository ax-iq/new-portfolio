import type Meta from "@/interfaces/Meta";
import type Page from "@/interfaces/Page";

export default interface ApiResponse {
	data: Page[];
	meta: Meta;
}
