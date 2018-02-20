import * as React from "react";
import { Page } from "../layouts/page";

export default class NotFoundPage extends Page<void> {

  public constructor(props: void) {
    super({
      title: "Not Found",
      description: "Not Found"
    }, props);
  }

  public render() {
    return (
      <div>
        <h1>Not Found</h1>
        <p>We couldn't find what you were looking for.</p>
      </div>
    );
  } 
}
