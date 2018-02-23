import * as React from "react";
import Link from "gatsby-link";
import { Page } from "../layouts/page";
import Img from "gatsby-image";
const falconNine = require("../images/falcon-9.gif");

export default class IndexPage extends React.PureComponent<any> {

  public render() {
    return (
      <Page title="Home" description="Welcome to the static site">
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Img resolutions={this.props.data.file.childImageSharp.resolutions} />
        <img src={falconNine} />
        <Link to="/blog">Go to blog</Link>
      </Page>
    );
  } 
}

export const pageQuery = graphql`
  query HeaderImageQuery {
    file(relativePath: { eq: "images/falcon-heavy.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        resolutions(width: 1000) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
  }
`
