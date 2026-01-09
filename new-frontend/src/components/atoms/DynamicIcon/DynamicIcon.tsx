import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import iconMap, { type IconName } from "@/utils/icons";

interface DynamicIconProps {
	className: string;
	name: IconName;
}

export default function DynamicIcon({ className, name }: DynamicIconProps) {
	const Icon = iconMap[name] || QuestionMarkCircleIcon;
	return <Icon className={className} aria-label={name} data-testid="icon" />;
}
