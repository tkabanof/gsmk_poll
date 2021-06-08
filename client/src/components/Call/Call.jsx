import {useEffect} from "react";
import {getAllPoll} from "../../features/polls";
import {useDispatch, useSelector} from "react-redux";
import CallInfoCard from "./CallInfoCard";
import {Space} from "antd";

const Call = () => {
    const dispatch = useDispatch()

    const dataPoll = useSelector(state => state.poll.data)

    useEffect(() => {
            dispatch(getAllPoll())
        },
        [])

    return (
        <Space direction="vertical">
            {dataPoll.map((p) => <CallInfoCard id = {p.id} name = {p.name}/>)}
        </Space>
    )
}

export default Call