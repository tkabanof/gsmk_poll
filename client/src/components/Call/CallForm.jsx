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
    for (let p of query) {
        console.log(p);
    }
    //let {id} = useParams();

    return (
        <div>Форма </div>
    )
}

export default CallForm