import * as React from "react";
import { StatusPage } from "../layouts/status-page";

export default function UnexpectedErrorPage() {
  return (
    <StatusPage
      title="Unexpected Error"
      shortDescription="An unexpected error ocurred"
      description="Yikes, something really went wrong."
    />
  );
}
