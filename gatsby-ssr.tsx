/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import { ContentSecurityPolicy, Policies } from "cspeasy";
import { renderToString } from "react-dom/server";
import * as React from "react";

interface GetJSXElementList {
    (): Array<JSX.Element>;
}

interface ReplaceJSXElementList {
    (elements: Array<JSX.Element>): void;
}

interface OnPreRenderHtmlArg {
    getHeadComponents: GetJSXElementList;
    getPreBodyComponents: GetJSXElementList;
    getPostBodyComponents: GetJSXElementList;
    replaceHeadComponents: ReplaceJSXElementList;
}

// You can delete this file if you're not using it
export const onPreRenderHTML = ({
    getHeadComponents,
    getPreBodyComponents,
    getPostBodyComponents,
    replaceHeadComponents }: OnPreRenderHtmlArg) => {

    let policy = new ContentSecurityPolicy({
        defaultSrc: Policies.None,
        scriptSrc: [ Policies.Self ],
        styleSrc: [ Policies.Self ],
        connectSrc: Policies.Self,
        imgSrc: [ Policies.Self, "data:" ]//Policies.Scheme.Data ]
    });

    const headComponents = getHeadComponents();

    const allComponents = headComponents
                            .concat(getPreBodyComponents())
                            .concat(getPostBodyComponents());
    
    const styleComponents = allComponents.filter(component => component.type === "style");
    const scriptComponents = allComponents.filter(component => component.type === "script");
    
    scriptComponents
        .map(getElementContent)
        .filter(x => notEmpty(x.content))
        .forEach(x => {
            policy = policy.addScript(x.content);
            x.element.props["data-script-hash"] = policy.scriptSrc[policy.scriptSrc.length - 1];
        });
    styleComponents
        .map(getElementContent)
        .filter(x => notEmpty(x.content))
        .forEach(x => {
            policy = policy.addStyle(x.content);
            x.element.props["data-style-hash"] = policy.styleSrc[policy.styleSrc.length - 1];
        });

    scriptComponents
        .map(getElementContent)
        .filter(x => notEmpty(x.content))
        .forEach(console.log);
    
    const cspMeta = <meta http-equiv="Content-Security-Policy" content={policy.getHeaderValue()}/>;

    replaceHeadComponents([ cspMeta ].concat(headComponents));
};

function notEmpty(content: string) {
    return !!content;
}

function getElementContent(element: JSX.Element) {
    return {
        element,
        content: renderToString(element).match(/^<.+>(.*)<\/.+>$/)[1]
    };
}
