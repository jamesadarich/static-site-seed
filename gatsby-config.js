const path = require("path");

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',

    // markdown plugins
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`./src/blog`),
        name: "markdown-pages",
      },
    },
    `gatsby-transformer-remark`,
  ],
};
