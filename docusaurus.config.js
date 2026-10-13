// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'XLeap Docs demo',
  tagline: 'Proof of concept of an online knowledge base for XLeap ',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Habilitar Mermaid en Markdown
  markdown: {
    mermaid: true,
  },

  // Registrar el tema de Mermaid
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    'docusaurus-plugin-image-zoom',
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-1RGM43S25Q', // Replace with your actual GA4 Measurement ID
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
        // Configuring the sitemap plugin built into preset-classic
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
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
      // Replace with your project's social card
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