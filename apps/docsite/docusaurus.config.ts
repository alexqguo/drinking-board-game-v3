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

  // TODO- put this back to 'throw'
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    navbar: {
      title: 'DBG Engine Docs',
      logo: {
        alt: 'Drinking Board Game Engine Logo',
        src: 'img/logo.svg',
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
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Engine API Reference',
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
            {
              label: 'Engine API Reference',
              to: '/docs/engine/README',
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
