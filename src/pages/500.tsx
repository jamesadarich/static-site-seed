import * as React from "react";
import { Page } from "../layouts/page";

export default class UnexpectedErrorPage extends React.PureComponent {
  public render() {
    return (
      <Page title="Unexpected Error" description="An unexpected error ocurred">
        <h1>Unexpected Error</h1>
        <p>Yikes, something really went wrong.</p>
      </Page>
    );
  }
}
