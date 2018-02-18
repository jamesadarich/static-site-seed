import * as React from "react";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";
import "./index.scss";

export default function TemplateWrapper({ children }: any) {
  return (
    <div>
      <Helmet
        title="Static Site Seed"
        meta={[
          { name: "description", content: "Starter for a static website" },
          { name: "keywords", content: "static, website, seed" }
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
        {children()}
      </div>
    </div>
  );
}

(TemplateWrapper as any).propTypes = {
  children: PropTypes.func
};
