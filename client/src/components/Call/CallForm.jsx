import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams, useLocation
} from "react-router-dom";

const CallForm = () => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();

    const keys = query.keys()
    const id = keys.next().value
    const filedParam = keys.next().value

    let o = {query: {}}
    o.id = query.get(id)
    o.query[filedParam] = query.get(filedParam)

    console.log(o)

    return (
        <div>Форма </div>
    )
}

export default CallForm