import type Footer from "@/interfaces/Footer";
import type Media from "@/interfaces/Media";
import type Meta from "@/interfaces/Meta";
import type NavBar from "@/interfaces/NavBar";
import type Seo from "@/interfaces/Seo";

export default interface ApiResponseGlobal {
	data: {
		id: number;
		documentId: string;
		siteName: string;
		siteDescription: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
		favicon: Media;
		defaultSeo: Seo;
		navBar: NavBar;
		footer: Footer;
	};
	meta: Meta;
}
