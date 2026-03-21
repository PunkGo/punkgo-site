import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			layout: {
				blog: join(__dirname, './src/lib/layouts/BlogPost.svelte')
			}
		})
	],
	kit: {
		adapter: adapter({
			runtime: 'nodejs22.x',
		})
	}
};

export default config;
