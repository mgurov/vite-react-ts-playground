import { Link } from "react-router-dom";

export default function Page() {
    return (<>
        <h1 data-testid="routed">sub</h1>
        <Link to="/sub/nice">nice</Link>
    </>)
}