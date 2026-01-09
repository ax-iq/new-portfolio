// import clsx from "clsx";

// interface LogoProps {
// 	name?: string;
// }

// export default function Logo({ name = "R.D" }: LogoProps) {
// 	return (
// 		<div className="lg:px-2 shadow-xl">
// 			<h3
// 				className={clsx(
// 					"text-white bg-primary text-lg font-bold font-[Open_Sans] ",
// 					"px-2 py-1 lg:p-0 text-center shadow-xl border-1 rounded",
// 				)}
// 			>
// 				{name}
// 			</h3>
// 		</div>
// 	);
// }

export default function Logo() {
	return (
		<div
			data-testid="logo"
			className="flex flex-row items-center justify-center"
		>
			<img src="/logo.svg" alt="Logo" className="w-10 lg:w-10" />
		</div>
	);
}
