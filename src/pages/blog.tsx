import * as React from "react";
import PostLink from "../components/post-link";
import { Page } from "../layouts/page";

export default class BlogList extends Page<any> {

  public constructor(props: any) {
    super({
      title: "Blog",
      description: "A list of musings and such"
    }, props);
  }

  public render() {
    const POSTS = this.props.data.allMarkdownRemark.edges
      .filter((edge: any) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
      .map((edge: any) => <PostLink key={edge.node.id} post={edge.node} />);
  
    return <div>{POSTS}</div>;
  } 
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
