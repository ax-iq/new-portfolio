import ContentType from "@/interfaces/ContentType";
import { strapi } from "@strapi/client";
import { API_URL } from "astro:env/server";
import type Rsp from "./rsp";

const BASE_URL: string = API_URL;

interface Props {
	endpoint: string;
	slug?: string;
	contentType: ContentType;
	locale?: string;
}

export async function fetchApi<T extends Rsp<unknown>>({
	endpoint,
	slug = "",
	contentType,
	locale,
}: Props): Promise<T> {
	const client = strapi({ baseURL: BASE_URL });

	if (contentType === ContentType.Single) {
		const manager = client.single(endpoint);

		try {
			const result = await manager.find({
				locale: `${locale}`,
			});

			return { result: result, error: null } as T;
		} catch (error) {
			if (error instanceof Error) {
				const errorContent = {
					time: new Date(),
					level: "ERROR",
					name: error.name,
					source: "Strapi Client",
					message: error.message,
					stack: error.stack,
				};
				console.error(JSON.stringify(errorContent));
			} else {
				console.error(JSON.stringify({ err: error }));
			}
			return { result: null, error: error } as T;
		}
	} else {
		const manager = client.collection(endpoint);
		try {
			const result = await manager.find({
				filters: { slug: { $eq: slug } },
				locale: `${locale}`,
			});
			return { result: result, error: null } as T;
		} catch (error) {
			if (error instanceof Error) {
				const errorContent = {
					time: new Date(),
					level: "ERROR",
					name: error.name,
					source: "Strapi Client",
					message: error.message,
					stack: error.stack,
				};
				console.error(JSON.stringify(errorContent));
			} else {
				console.error(JSON.stringify({ err: error }));
			}
			return { result: null, error: error } as T;
		}
	}
}
