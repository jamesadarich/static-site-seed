const path = require("path");

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    // markdown plugins
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`./src/blog`),
        name: "markdown-pages",
      },
    },
    `gatsby-transformer-remark`,
    
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
        includeInDevelopment: true,
      },
    },
  ],
};
