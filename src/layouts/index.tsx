import * as React from "react";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";
import "./index.scss";

export default class TemplateWrapper extends React.PureComponent {

  public render() {
  
    const children = (this.props.children as any)();

    const pageResources = children.props.render(this.props).props.pageResources;

    const childPageInfo = new pageResources.component(pageResources.json);

    const standardKeywords = [
      "static",
      "website",
      "seed"
    ];

    return (
      <div>
        <Helmet
          title={`Static Site Seed - ${childPageInfo.title}`}
          meta={[
            { name: "description", content: childPageInfo.description },
            { name: "keywords", content: standardKeywords.concat(childPageInfo.keywords).join(", ") }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header />
        <div
          style={{
            margin: "0 auto",
            maxWidth: 960,
            padding: "0px 1.0875rem 1.45rem",
            paddingTop: 0
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

(TemplateWrapper as any).propTypes = {
  children: PropTypes.func
};
