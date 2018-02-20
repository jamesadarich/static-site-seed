import * as React from "react";
import * as PropTypes from "prop-types";
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
          {(this.props.children as any)()}
        </div>
      </div>
    );
  }
}

(SiteShell as any).propTypes = {
  children: PropTypes.func
};
