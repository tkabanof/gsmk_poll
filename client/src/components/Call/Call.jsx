import {useEffect} from "react";
import {getAllPoll} from "../../features/polls";
import {useDispatch, useSelector} from "react-redux";
import CallInfoCard from "./CallInfoCard";

const Call = () => {
    const dispatch = useDispatch()

    const dataPoll = useSelector(state => state.poll.data)

    useEffect(() => {
            dispatch(getAllPoll())
        },
        [])

    return (
        <div>
            {dataPoll.map((p) => <CallInfoCard id = {p.id} name = {p.name}/>)}
        </div>
    )
}

export default Call