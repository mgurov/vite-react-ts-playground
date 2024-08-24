import { ActionFunction, createBrowserRouter, LoaderFunction, RouteObject } from "react-router-dom";

/**
 * A simplistic file-based router inspired by https://dev.to/franciscomendes10866/file-based-routing-using-vite-and-react-router-3fdo 
 */

const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
const pageRegex = /\.\/pages\/(.*)\.tsx$/;

export function createRouter() {
    const routes: RouteObject[] = [];
    for (const path of Object.keys(pages)) {
        const fileName = path.match(pageRegex)?.[1];
        if (!fileName) {
            console.error(`unexpected non-match of ${path} to ${pageRegex}`);
            continue;
        }
        const normalizedPathName = fileName.includes("$")
            ? fileName.replace("$", ":")
            : fileName.replace(/\/index/, "");

        const page = pages[path] as {
            default: React.FunctionComponent,
            loader?: LoaderFunction,
            action?: ActionFunction,
            ErrorBoundary?: React.FunctionComponent,
        }

        if (!page.default) {
            throw Error(`Page on path ${path} doesn't have required default export`)
        }

        const Element = page.default;
        const ErrorBoundary = page.ErrorBoundary;

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