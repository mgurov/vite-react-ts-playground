
export default function LoadingPage() {
    return (<h1 data-testid="routed">sub/loadingPage</h1>)
}

export async function loader({request, params}) {
    console.log('loading', request, params);
    return new Promise((resolve) => {
        setTimeout(() => {resolve(['a', 'b', 'c'])}, 1000)
    })
}