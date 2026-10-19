// @ts-check
// JSDoc annotations allow editor autocompletion and type checking
// (when paired with @ts-check).
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'XLeap Docs demo',
  tagline: 'Proof of concept of an online knowledge base for XLeap ',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'facebook',
  projectName: 'docusaurus',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    'docusaurus-plugin-image-zoom',
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-1RGM43S25Q',
        anonymizeIP: true,
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      zoom: {
        selector: '.markdown :not(a) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)',
        },
      },
      navbar: {
        title: 'XLeap Docs',
        logo: {
          alt: 'XLeap Logo',
          src: 'img/xleapicon.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Knowledge Base',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Other Resources',
            items: [
              {
                label: 'Your company website',
                href: 'https://xleap.net',
              },
              {
                label: 'Your YouTube Channel',
                href: 'https://www.youtube.com/@saasvideotutorials',
              },
            ],
          },
          {
            title: 'Code and Deployment',
            items: [
              {
                label: 'This Demo files on GitHub',
                href: 'https://github.com/jose-salgado81/demo-knowledge-base',
              },
              {
                label: 'The Docusaurus engine',
                href: 'https://docusaurus.io/',
              },
              {
                label: 'Deployed using Vercel',
                href: 'https://vercel.com/frameworks/nextjs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} An Open Source Knowledge Base Demo Project`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;