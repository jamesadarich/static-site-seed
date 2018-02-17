/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

// blog stuff
const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/components/blog-post.js`);

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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      });
    });
  });
};

const fs = require('fs') // native
const zlib = require('zlib')  // native
const glob = require('glob') // https://www.npmjs.com/package/glob

exports.onPostBuild = (pages) => {
  const publicPath = path.join(__dirname, 'public')
  const gzippable = glob.sync(`${publicPath}/**/?(*.html|*.js|*.css)`)
  gzippable.forEach(file => {
    const content = fs.readFileSync(file) 
    const zipped = zlib.gzipSync(content)
    fs.writeFileSync(`${file}`, zipped)
  });
}
