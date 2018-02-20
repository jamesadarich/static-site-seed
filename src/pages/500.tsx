import * as React from "react";
import { Page } from "../layouts/page";

export default class UnexpectedErrorPage extends Page<void> {

  public constructor(props: void) {
    super({
      title: "Unexpected Error",
      description: "An unexpected error ocurred"
    }, props);
  }

  public render() {
    return (
      <div>
        <h1>Unexpected Error</h1>
        <p>Yikes, something really went wrong.</p>
      </div>
    );
  } 
}
