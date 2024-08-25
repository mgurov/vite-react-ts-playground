import { useParams } from "react-router-dom"

export default function Page() {
    const params = useParams()
    return (<h1 data-testid="routed">Entity {params['entityId']}</h1>)
}