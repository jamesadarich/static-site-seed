import * as React from "react";
import Link from "gatsby-link";

export default function IndexPage() {
  return (
    <div>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Link to="/blog">Go to blog</Link>
    </div>
  );
}
