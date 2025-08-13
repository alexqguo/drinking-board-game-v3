import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Drinking Board Game Engine Docs',
  tagline: 'Tutorials, technical reference, and guides',
  favicon: 'img/favicon.png',

  url: 'https://docs.drink.alexguo.co',
  baseUrl: '/',

  organizationName: 'alexqguo',
  projectName: 'drinking-board-game-v3',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/favicon.png',
    navbar: {
      title: 'DBG Engine Docs',
      logo: {
        alt: 'Drinking Board Game Engine Logo',
        src: 'img/favicon.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'tutorial',
          position: 'left',
          label: 'Tutorial',
        },
        {
          type: 'doc',
          docId: 'technical-overview',
          position: 'left',
          label: 'Technical Overview',
        },
        {
          href: 'https://github.com/alexqguo/drinking-board-game-v3',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/tutorial',
            },
            {
              label: 'Technical Overview',
              to: '/docs/technical-overview',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/alexqguo/drinking-board-game-v3',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Drinking Board Game Engine. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
