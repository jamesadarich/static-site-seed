import * as React from "react";
import { StatusPage } from "../layouts/status-page";


export default class UnexpectedErrorPage extends React.PureComponent {
  public render() {
    return (
      <StatusPage title="Unexpected Error"
                  shortDescription="An unexpected error ocurred"
                  description="Yikes, something really went wrong." />
    );
  }
}
