import type Media from "@/interfaces/Media";

export default function makeMedia(overrides: Partial<Media>): Media {
	return {
		id: overrides.id ?? 0,
		documentId: overrides.documentId ?? "docid",
		alternativeText: overrides.alternativeText ?? "media",
		name: overrides.name ?? "random-media",
		url: overrides.url ?? "",
	};
}
