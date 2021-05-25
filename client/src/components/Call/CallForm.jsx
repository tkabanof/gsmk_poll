import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";

const CallForm = () => {
    let {id} = useParams();

    return (
        <div>Форма {id}</div>
    )
}

export default CallForm