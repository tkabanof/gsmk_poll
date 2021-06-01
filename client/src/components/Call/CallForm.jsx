import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams, useLocation
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getNewClient} from "../../features/client";
import {useEffect} from "react";
import {Descriptions, Tag} from "antd";

const CallForm = () => {

    let data = useSelector(state => state.client.data)

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

    useEffect(() => {
        dispatch(getNewClient(query))
        console.log(data)
    }, [])



    return (
        <div>
            <Descriptions
                title="Информация о человеке"
            >
                <Descriptions.Item label="ФИО">
                    <Tag color="blue">
                        {data.surname + ' ' + data.name1 + ' ' + data.name2}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Телефон">
                    <Tag color="blue">
                        {data.phone}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Дата рождения">{data.birthday}</Descriptions.Item>
                <Descriptions.Item label="MO">{data.mo}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default CallForm