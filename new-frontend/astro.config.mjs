// @ts-check

import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

let SITE_NAME = ""
if (process.env.SITE_NAME) {
	SITE_NAME = process.env.SITE_NAME
} else {
	SITE_NAME = "frontend.localhost"
}

const { SITE_URL } = loadEnv(SITE_NAME, process.cwd(), "");

const locales = {
	locales: ["en", "fr"],
	defaultLocale: "en",
	routing: {
		prefixDefaultLocale: true,
		redirectToDefaultLocale: false,
	},
};

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	prefetch: true,
	server: {
    	allowedHosts: [SITE_NAME],
		port: 4321,
		host: true,
		headers: {
      		'Referrer-Policy': 'no-referrer', // or 'strict-origin-when-cross-origin'
    	}
	},
	// 'server' = SSR; 'static' = SSG (the default value)
	output: "server",
	adapter: node({
		mode: "middleware",
	}),

	integrations: [react(),sitemap()],

	vite: {
		plugins: [
			tsconfigPaths({
				loose: true,
			}),
			tailwindcss(),
		],
		ssr: {
			noExternal: import.meta.env.PROD ? true : undefined, // Bundles all dependencies
		},
	},

	env: {
		schema: {
			API_URL: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
			BACKEND_BASE_URL: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
		},
	},

	devToolbar: { enabled: false },
	i18n: locales,
});
