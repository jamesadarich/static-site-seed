import * as React from "react";
import Link from "gatsby-link";
import { Page } from "../layouts/page";

export default class IndexPage extends Page<void> {

  public constructor(props: void) {
    super({
      title: "Home",
      description: "Welcome to the static site"
    }, props);
  }

  public render() {
    return (
      <div>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/blog">Go to blog</Link>
      </div>
    );
  } 
}
