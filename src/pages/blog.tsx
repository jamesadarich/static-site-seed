import * as React from "react";
import PostLink from "../components/post-link";
import { Page } from "../layouts/page";
import { BlogPost } from "../graphql/blog-post";
import { graphql } from "gatsby";

interface BlogListProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{ node: BlogPost }>;
    };
  };
}

export default (props: BlogListProps) => {
  const POSTS = props.data.allMarkdownRemark.edges
    .filter(edge => !edge.node.frontmatter.draft) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);
   return (
    <Page title="Blog" description="A list of musings and such">
      {POSTS}
    </Page>
  );
};

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
            description
            draft
          }
        }
      }
    }
  }
`;
