import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default ({mode}) => {
	process.env = {...process.env, ...loadEnv(mode, process.cwd())}
	return defineConfig({
		server: {
			port : 5000,
		},
		plugins: [
			sveltekit(),
		]
	});
}
