import {isRouteErrorResponse, useParams, useRouteError} from 'react-router-dom'


export default function Page() {
    const params = useParams<{action: 'throw' | 'ok'}>()
    if (params?.action === 'throw') {
        throw new Error('Was instructed to throw')
    }
    return (<h1 data-testid="routed">{params?.action}</h1>)
}

export function ErrorBoundary() {
    const error = useRouteError()
    if (isRouteErrorResponse(error)) {
      return (
        <>
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </>
      );
    } else if (error instanceof Error) {
      return (
        <div>
          <h1>Error</h1>
          <p data-testid="error-caught-message">{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </div>
      );
    } else {
      console.error("Unknown error", error);
      return <h1>Unknown Error</h1>;
    }
  }
  