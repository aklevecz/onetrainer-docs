import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
		
          title: 'My Docs',
          social: {
              github: 'https://github.com/withastro/starlight',
          },
          sidebar: [
              // {
              // 	label: 'Guides',
              // 	items: [
              // 		// Each item here is one entry in the navigation menu.
              // 		{ label: 'Example Guide', slug: 'guides/example' },
              // 	],
              // },
              {
                  label: 'Wiki',
                  autogenerate: { directory: 'wiki' },
              },
          ],
      }),
	],

  output: 'server',
  vite: {
	ssr: {
		external: ['node:url', 'node:path', 'node:child_process']
	}
  },
  adapter: cloudflare(),
});