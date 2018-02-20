import * as React from "react";
import { Page } from "../layouts/page";

export default class BlogPage  extends Page<any> {

  public constructor(props: any) {
    super({
      title: props.data.markdownRemark.frontmatter.title,
      description: props.data.markdownRemark.frontmatter.description,
      keywords: props.data.markdownRemark.frontmatter.keywords
    }, props);
  }

  public render() {
    const { markdownRemark } = this.props.data; // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark;
    return (
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
