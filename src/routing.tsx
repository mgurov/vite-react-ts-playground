import { ReactNode } from "react";
import { createBrowserRouter, LoaderFunction, RouteObject } from "react-router-dom";

/**
 * A simplistic file-based router inspired by https://dev.to/franciscomendes10866/file-based-routing-using-vite-and-react-router-3fdo 
 */

export function normalizePathName(fileName: string): string {
    const deflat = fileName.split('/').flatMap(pathPart => pathPart.split('.'));
    return deflat.flatMap((pathParticle) => {
        if (pathParticle === "index") return [];
        if (pathParticle.startsWith('$')) return [pathParticle.replace("$", ":")];
        return [pathParticle];
    }).join('/');
}

export function getPageRouteObject(
    fileName: string,
    page: Page
): RouteObject {
    const normalizedPathName = normalizePathName(fileName);
    const ErrorBoundary = page.ErrorBoundary;
    return {
        path: fileName === "index" ? "/" : `/${normalizedPathName}`,
        Component: page.default,
        loader: page.loader,
        hydrateFallbackElement: page.HydrateFallbackElement?.(),
        ...( ErrorBoundary && {errorElement: <ErrorBoundary/>} )
    };
}

type Page = {
    default: React.FunctionComponent,
    loader?: LoaderFunction,
    ErrorBoundary?: React.FunctionComponent,
    HydrateFallbackElement?: () => React.ReactNode,
}

export function pathsToRoutes(
    pages: Record<string, Page>,
    pageRegex: RegExp = defaultPageRegex
): RouteObject[] {
    const routes: RouteObject[] = [];
    for (const path of Object.keys(pages)) {
        const fileName = path.match(pageRegex)?.[1];
        if (!fileName) {
            // For testability, don't throw or log here
            continue;
        }
        const page = pages[path];
        if (!page.default) {
            throw Error(`Page on path ${path} doesn't have required default export`);
        }
        routes.push(getPageRouteObject(fileName, page));
    }
    return routes;
}

const pages = import.meta.glob("./routes/**/*.tsx", { eager: true }) as Record<string, Page>;
export const defaultPageRegex = /\.\/routes\/(.*)\.tsx$/;

export function createRouter(props?: {layout?: ReactNode}) {
    const pageRoutes = pathsToRoutes(pages, defaultPageRegex);
    const routes: RouteObject[] = props?.layout ? [{
        path: "/",
        element: props.layout,
        children: pageRoutes
    }] : pageRoutes;
    return createBrowserRouter(routes, {
        future: {},
    });
}