import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

const vueAppAlias = fileURLToPath(
	new URL("./src/virtual-astrojs-vue-app.ts", import.meta.url),
);
export default defineConfig({
	output: "server",
	adapter: vercel(),
	integrations: [vue(), react()],
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ["@astrojs/vue", "@astrojs/react"],
		},
		resolve: {
			alias: {
				/**
				 * The Vue renderer imports `virtual:@astrojs/vue/app` which is normally
				 * provided by the Vite plugin. When Astro builds a server bundle for
				 * Vercel, that virtual module can leak into the final output and Node's
				 * ESM loader rejects the `virtual:` scheme. We alias the virtual module
				 * to a tiny local stub so the server bundle resolves to a real file.
				 */
				"virtual:@astrojs/vue/app": vueAppAlias,
				// The React renderer reads integration options from a virtual module.
				// Provide a concrete file so the server bundle can resolve it at runtime.
				"astro:react:opts": fileURLToPath(
					new URL("./src/virtual-astro-react-opts.ts", import.meta.url),
				),
			},
		},
	},
});
