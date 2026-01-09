interface TimelineIconProps {
	src: string;
}

export default function TimelineIcon({ src }: TimelineIconProps) {
	return (
		<img
			src={src}
			alt="Timeline Icon"
			className="rounded-full border-4 border-white size-10 lg:size-15"
		/>
	);
}
