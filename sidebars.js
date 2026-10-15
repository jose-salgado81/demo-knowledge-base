// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'About this demo',
      link: {type: 'generated-index'},
      items: [
        'about/Why Knowlege Base',
        'about/about this demo',
        'about/about the author',
      ],
    },
    {
      type: 'category',
      label: 'Video Library',
      link: {type: 'generated-index'},
      items: ['videolibrary/Video Library'],
    },
    {
      type: 'category',
      label: 'Diagrams',
      link: {type: 'generated-index'},
      items: ['diagrams/mermaid'],
    },
    {
      type: 'category',
      label: 'Example section: Invitation Dialogue',
      link: {type: 'generated-index'},
      items: ['invitationdialogue/Login Requirements'],
    },
    {
      type: 'category',
      label: 'Example section: Process Designer',
      link: {type: 'generated-index'},
      items: ['process_designer/intro_to_process_designer'],
    },
  ],
};

export default sidebars;
