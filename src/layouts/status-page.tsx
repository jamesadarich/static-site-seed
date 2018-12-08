import * as React from "react";
import { Page } from "./page";

export interface StatusPageProps {
  description: string;
  shortDescription?: string;
  title: string;
}

export class StatusPage extends React.PureComponent<StatusPageProps> {
  public render() {
    return (
      <Page
        title={this.props.title}
        description={this.props.shortDescription || this.props.description}
      >
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </Page>
    );
  }
}
