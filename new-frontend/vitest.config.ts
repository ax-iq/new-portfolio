/// <reference types="vitest/config" />

import { playwright } from "@vitest/browser-playwright";
import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		css: true,
		projects: [
			{
				extends: true,
				test: {
					name: "unit",
					include: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
					exclude: ["node_modules", "**/*.browser.test.{js,jsx,ts,tsx}"],
					environment: "jsdom",
					css: true,
					globals: true,
					setupFiles: "./src/test/setup-jsdom.ts",
				},
			},
			{
				extends: true,
				test: {
					name: "browser",
					include: ["**/*.browser.test.{js,jsx,ts,tsx}"],
					exclude: ["node_modules"],
					css: true,
					setupFiles: "./src/test/setup-browser.ts",
					browser: {
						provider: playwright(),
						enabled: true,
						headless: true,
						instances: [{ browser: "chromium" }],
					},
				},
			},
		],
	},
});
