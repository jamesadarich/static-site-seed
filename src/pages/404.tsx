import * as React from "react";
import { StatusPage } from "../layouts/status-page";

export default function NotFoundPage() {
  return (
    <StatusPage
      title="Not Found"
      shortDescription="Page could not be found"
      description="We couldn't find what you were looking for."
    />
  );
}
