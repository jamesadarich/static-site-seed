/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// blog stuff
import * as path from "path";
import * as fs from "fs";
import * as zlib from "zlib";
import * as glob from "glob";

exports.createPages = ({ boundActionCreators, graphql }: any) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/components/blog-post.tsx`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }: any) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {} // additional data can be passed via context
      });
    });
  });
};

exports.onPostBuild = (pages: any) => {
  const publicPath = path.join(__dirname, "public");
  const gzippable = glob.sync(`${publicPath}/**/?(*.html|*.js|*.css)`);
  gzippable.forEach((file: any) => {
    const content = fs.readFileSync(file);
    const zipped = zlib.gzipSync(content);
    fs.writeFileSync(`${file}`, zipped);
  });
};
