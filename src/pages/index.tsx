import * as React from "react";
import Link from "gatsby-link";
import { Page } from "../layouts/page";
const Img = require("gatsby-image");

export default class IndexPage extends React.PureComponent<any> {

  public render() {
    return (
      <Page title="Home" description="Welcome to the static site">
        <h1>Hi people</h1>
        <Img resolutions={this.props.data.file.childImageSharp.resolutions} />
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/blog">Go to blog</Link>
      </Page>
    );
  } 
}

export const query = graphql`
query GatsbyImageSampleQuery {
  file(relativePath: { eq: "src/images/falcon-heavy.jpeg" }) {
    childImageSharp {
      # Specify the image processing specifications right in the query.
      # Makes it trivial to update as your page's design changes.
      resolutions(width: 125, height: 125) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
}
`;
