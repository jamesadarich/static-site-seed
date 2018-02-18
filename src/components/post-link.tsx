import * as React from "react";
import Link from "gatsby-link";

export default function PostLink({ post }: any) {
  return (
    <div>
      <Link to={post.frontmatter.path}>
        {post.frontmatter.title} ({post.frontmatter.date})
      </Link>
    </div>
  );
}
