import * as React from "react";
import Helmet from "react-helmet";
import SiteShell from "./index";

interface PageProps {    
    readonly title: string;
    readonly description: string;
    readonly keywords?: Array<string>;
}

export abstract class Page extends React.PureComponent<PageProps> {
    
    private get keywords() {
        return [
            "static",
            "website",
            "seed"
        ].concat(this.props.keywords);
    }

    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <SiteShell>                
                <Helmet
                    title={`Static Site Seed - ${this.props.title}`}
                    meta={[
                        { name: "description", content: this.props.description },
                        { name: "keywords", content: this.keywords.join(", ") }
                    ]}
                    >
                    <html lang="en" />
                </Helmet>
                {this.props.children}
            </SiteShell>
        )
    }
}
