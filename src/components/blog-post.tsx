import * as React from "react";
import { Page } from "../layouts/page";

export default class BlogPage extends React.PureComponent<any> {

  public render() {
    const { markdownRemark } = this.props.data; // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark;
    return (
      <Page title={frontmatter.title} description={frontmatter.description} keywords={frontmatter.keywords.split(",").map((keyword: string) => keyword.trim())}>
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </Page>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        keywords
      }
    }
  }
`;
