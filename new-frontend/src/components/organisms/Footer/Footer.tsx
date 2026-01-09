import Link from "@/components/atoms/Link/Link";
import type LinkType from "@/interfaces/Link";

interface FooterType {
	id: number;
	copyright: string;
	links: LinkType[];
}

interface FooterProps {
	footerData: FooterType;
}

export default function Footer({ footerData }: FooterProps) {
	return (
		<footer className="bg-stone-100 shadow-2xl p-10 flex flex-col items-center">
			<div>
				{footerData.links.map((link) => (
					<Link
						key={link.id}
						href={link.href}
						label={link.label}
						isExternal={true}
					/>
				))}
			</div>
			<div>{footerData.copyright}</div>
		</footer>
	);
}
