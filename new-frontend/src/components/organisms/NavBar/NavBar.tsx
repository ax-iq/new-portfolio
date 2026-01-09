import clsx from "clsx";
import { useState } from "react";
import BurgerButton from "@/components/atoms/BurgerButton/BurgerButton";
import Logo from "@/components/atoms/Logo/Logo";
import LangSwitch from "@/components/molecules/LangSwitch/LangSwitch";
import MobileMenu from "@/components/molecules/MobileMenu/MobileMenu";
import NavBarItem from "@/components/molecules/NavBarItem/NavBarItem";
import localesConfig from "@/config/locales";
import type NavBarType from "@/interfaces/NavBar";
import type { FlagCode } from "@/utils/flags";

interface NavBarProps {
	navBarData: NavBarType;
	currentPagePath: string;
	// example: 'en'
	locale: string;
}

export default function NavBar({
	navBarData,
	currentPagePath,
	locale,
}: NavBarProps) {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setIsBurgerMenuOpen((prev) => !prev);
	};

	return (
		<nav
			className="sticky top-0 z-10 lg:h-full flex flex-row bg-secondary"
			data-testid="navbar"
		>
			{/* Side Bar */}
			<div className="w-full lg:w-auto  flex flex-col">
				{/* Top Icons */}
				<div
					className={clsx(
						"flex flex-row lg:flex-col lg:gap-0 justify-between lg:justify-normal p-2 lg:px-0 lg:py-2",
					)}
				>
					{/* Website Logo */}
					<Logo />

					{/* Desktop Menu */}
					<div className={clsx("hidden lg:flex lg:flex-col", "")}>
						<div>
							{navBarData.navItems.map((navItem) => {
								return (
									<NavBarItem
										key={navItem.id}
										item={navItem}
										currentPagePath={currentPagePath}
										locale={locale}
									/>
								);
							})}
						</div>
					</div>

					{/* Mobile Navigation Items */}
					<div className="flex flex-row gap-1 lg:hidden">
						<LangSwitch
							flagCodes={
								localesConfig.locales.map((locale) =>
									locale.toUpperCase(),
								) as FlagCode[]
							}
							currentLocale={locale}
							currentPagePath={currentPagePath}
						/>
						{/* Mobile Toggle Button */}
						<BurgerButton
							isOpen={isBurgerMenuOpen}
							onClickHandler={handleOpen}
						/>
					</div>
				</div>

				{/* Bottom Icons */}
				<div className="hidden lg:flex flex-col flex-grow justify-end">
					<LangSwitch
						flagCodes={
							localesConfig.locales.map((locale) =>
								locale.toUpperCase(),
							) as FlagCode[]
						}
						currentLocale={locale}
						currentPagePath={currentPagePath}
					/>
				</div>

				{/* Mobile Menu */}
				<MobileMenu
					items={navBarData.navItems}
					currentPagePath={currentPagePath}
					isMenuOpen={isBurgerMenuOpen}
					locale={locale}
				/>
			</div>
		</nav>
	);
}
