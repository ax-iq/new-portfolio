import {
	Bars3Icon,
	BookOpenIcon,
	BriefcaseIcon,
	CheckBadgeIcon,
	ClipboardDocumentListIcon,
	HomeIcon,
	LanguageIcon,
	PhoneIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";

const iconMap = {
	BriefcaseIcon,
	ClipboardDocumentListIcon,
	BookOpenIcon,
	CheckBadgeIcon,
	PhoneIcon,
	HomeIcon,
	LanguageIcon,
	XMarkIcon,
	Bars3Icon,
};

export type IconName = keyof typeof iconMap;

export default iconMap;
