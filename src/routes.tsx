import { ReactElement } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

type FileBasedPageRouteDefinition = {
    
}

export function createRouter() {
    console.log('createRouter. 1x ?')
    //TODO: non-eager and all with selector later?
    const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

    const routes: RouteObject[] = [];
    for (const path of Object.keys(pages)) {
        const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
        if (!fileName) {
            continue;
        }
        const normalizedPathName = fileName.includes("$")
            ? fileName.replace("$", ":")
            : fileName.replace(/\/index/, "");

        const page = pages[path] as {
            default: JSX.Element,
            loader?: any,
            action?: any,
            ErrorBoundary?: JSX.Element,
        }

        if (!page.default) {
            throw Error(`Page on path ${path} doesn't have required default export`)
        }

        const Element = page.default as ReactElement;
        const ErrorBoundary = page.ErrorBoundary;

        //TODO: param example

        routes.push({
            path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
            element: <Element />,
            loader: page.loader,
            action: page.action,
            ...( ErrorBoundary && {errorElement: <ErrorBoundary/>} )
        });
    }

    return createBrowserRouter(routes);
      


}