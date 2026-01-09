import clsx from "clsx";
import Flag from "@/components/atoms/Flag/Flag";
import type { FlagCode } from "@/utils/flags";
import IconButton from "../IconButton/IconButton";

interface LangSwitchProps {
	flagCodes: FlagCode[];
	// example: 'en'
	currentLocale: string;
	// example: '/en/projects'
	currentPagePath: string;
}

export default function LangSwitch({
	flagCodes = ["EN", "FR"],
	currentLocale,
	currentPagePath,
}: LangSwitchProps) {
	const currentPage = currentPagePath.replace(`/${currentLocale}/`, "");

	return (
		<IconButton icon="LanguageIcon">
			{flagCodes.map((locale) => {
				const isActive = locale === currentLocale;
				return (
					<a
						key={locale}
						href={`/${locale.toLowerCase()}/${currentPage}`}
						className={clsx(
							isActive ? "text-primary" : "lg:hover:text-primary ",
							"transition-all duration-300 ease-linear",
							"flex flex-row items-center gap-1",
						)}
					>
						<Flag
							code={locale.toUpperCase() as FlagCode}
							alt={locale}
							className="size-5"
						/>
						<div className="">{locale.toUpperCase()}</div>
					</a>
				);
			})}
		</IconButton>
	);
}
