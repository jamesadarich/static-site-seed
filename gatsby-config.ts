import * as path from "path";

interface GatsbyConfig {
  siteMetadata: {
    siteUrl: string;
    title: string;
  }
  plugins: Array<string | { resolve: string, options?: object }>;
}

const GATSBY_CONFIG: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://${process.env.SITE_DOMAIN}`,
    title: "Gatsby Default Starter"
  },
  plugins: [
    // core templates
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",

    // markdown plugins
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: path.resolve("./src/blog"),
        name: "markdown-pages"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-plugin-sharp",
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },

    // SEO plugins
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: `https://${process.env.SITE_DOMAIN}`,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(
            filter: {
              path: {
                regex: "${/^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|500)).*$/}"
              }
            }
          ) {
            edges {
              node {
                path
              }
            }
          }
        }`
      }
    }
  ]
};

if (process.env.GOOGLE_TAG_MANAGER_ID) {
  GATSBY_CONFIG.plugins.push(
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
        includeInDevelopment: false
      }
    }
  );

}

export = GATSBY_CONFIG;
