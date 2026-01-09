import { type FlagCode, FlagMap } from "@/utils/flags";

interface FlagProps {
	code: FlagCode;
	className?: string;
	alt?: string;
}

export default function Flag({ code, className = "", alt }: FlagProps) {
	const src = FlagMap[code].src || "";
	return (
		<div className={`${className}`}>
			<img src={src} alt={alt} />
		</div>
	);
}
