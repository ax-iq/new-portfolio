interface TagProps {
	label: string;
}

export default function Tag({ label }: TagProps) {
	return (
		<div className="text-xs lg:text-sm rounded px-1 bg-secondary">{label}</div>
	);
}
