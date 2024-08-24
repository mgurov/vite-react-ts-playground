import { useLoaderData } from "react-router-dom";

export default function SwPeople() {
    const loaderData = useLoaderData() as {name: string};
    return (<h1 data-testid="routed">{loaderData.name}</h1>)
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}: {params: {id: string}}) {
    return fetch(`https://swapi.dev/api/people/${params.id}/`)
}