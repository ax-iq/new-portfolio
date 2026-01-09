// import Button from "@/components/atoms/Button/Button";
// import Link from "@/components/atoms/Link/Link";
import Tag from "@/components/atoms/Tag/Tag";
import type TagType from "@/interfaces/Tag";

interface CardProps {
	title: string;
	subTitle: string;
	tags: TagType[];
	date: string;
	children: React.ReactNode;
}

export default function Card({
	title,
	subTitle,
	tags,
	date,
	children,
}: CardProps) {
	return (
		<div className="bg-white rounded-lg p-2">
			{/* Card Title + SubTitle + Date */}
			<h3 className="text-lg lg:text-2xl font-bold text-[#495057]">{title}</h3>
			<h6 className="text-xs lg:text-sm">{subTitle}</h6>
			<h6 className="lg:hidden text-xs">{date}</h6>

			{/* Card Main Content */}
			{children}

			{/* List of Tags */}
			<div className="flex flex-row gap-1">
				{tags.map((tag) => (
					<Tag key={tag.id} label={`#${tag.label}`} />
				))}
			</div>

			{/* TODO Add in next sprint */}
			{/* <Button>
				<span>READ MORE</span>
			</Button> */}
			{/* <Link href="" label="READ MORE"/> */}
		</div>
	);
}
