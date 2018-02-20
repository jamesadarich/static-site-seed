import * as React from "react";
import { Page } from "../layouts/page";

export default class NotFoundPage extends React.PureComponent {

  public render() {
    return (
      <Page title="Not Found" description="Not Found">
        <h1>Not Found</h1>
        <p>We couldn't find what you were looking for.</p>
      </Page>
    );
  } 
}
