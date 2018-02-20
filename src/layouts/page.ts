import { PureComponent } from "react";

interface PageProperties {    
    readonly title: string;
    readonly description: string;
    readonly keywords?: Array<string>;
}

export abstract class Page<T = void> extends PureComponent<T> {
    public readonly title: string;
    public readonly description: string;
    public readonly keywords: Array<string>;

    public constructor(pageProperties: PageProperties, props: T) {
        super(props);

        this.title = pageProperties.title;
        this.description = pageProperties.description;
        this.keywords = pageProperties.keywords || [];
    }
}
