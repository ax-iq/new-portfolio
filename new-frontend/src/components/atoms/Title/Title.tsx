interface TitleProps {
	label: string;
}

export default function Title({ label }: TitleProps) {
	return <h1 className="font-bold text-2xl lg:text-4xl">{label}</h1>;
}
