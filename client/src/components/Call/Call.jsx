import {useEffect} from "react";
import {getAllPoll, getAllPollOpen} from "../../features/polls";
import {useDispatch, useSelector} from "react-redux";
import CallInfoCard from "./CallInfoCard";
import {Result, Space} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import {logDOM} from "@testing-library/react";

const Call = () => {
    const dispatch = useDispatch()

    const dataPoll = useSelector(state => state.poll.data)

    useEffect(() => {
            dispatch(getAllPollOpen())
        },
        [])

    const result = (<Result
        icon={<SmileOutlined />}
        title="Открытых опросов нет! Никому звонить не нужно!"
    />)
    return (
            <Space direction="vertical">
                {

                    dataPoll.length !== 0 ? dataPoll.map((p) => <CallInfoCard key = {p.id} id = {p.id} name = {p.name}/>) : result
                }
            </Space>
    )
}

export default Call