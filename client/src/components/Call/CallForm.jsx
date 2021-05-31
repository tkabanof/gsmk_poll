import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams, useLocation
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getNewClient} from "../../features/client";
import {useEffect} from "react";

const CallForm = () => {

    let data = useSelector(state => state.client)

    const dispatch = useDispatch()
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();


    /*

    const keys = query.keys()
    const id = keys.next().value
    const filedParam = keys.next().value

    let o = {query: {}}
    o.id = query.get(id)
    o.query[filedParam] = query.get(filedParam)
    */

    //dispatch(getNewClient(o.query))

    //console.log(o)}

    useEffect(()=> {
        dispatch(getNewClient(query))
        console.log(data)
    },[])
    return (
        <div>Форма </div>
    )
}

export default CallForm