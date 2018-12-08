import * as React from "react";
import { Link } from "gatsby";
import { BlogPost } from "../graphql/blog-post";

interface PostLinkProps {
  post: BlogPost;
}

 export default function PostLink({ post }: PostLinkProps) {
  return (
    <div>
      <Link to={post.frontmatter.path}>
        {post.frontmatter.title} ({post.frontmatter.date})
      </Link>
    </div>
  );
}
