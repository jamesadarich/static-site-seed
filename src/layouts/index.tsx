import * as React from "react";
import Header from "../components/Header";
import "./index.scss";

export default class SiteShell extends React.PureComponent {

  public render() {

    return (
      <div>
        <Header />
        <div
          style={{
            margin: "0 auto",
            maxWidth: 960,
            padding: "0px 1.0875rem 1.45rem",
            paddingTop: 0
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
