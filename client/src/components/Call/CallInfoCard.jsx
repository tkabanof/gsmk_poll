import {Button, Card, Dropdown, Menu, Select} from "antd";
import {pollApi} from "../../Api/Api";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {CALL_ROUTE_DETAIL} from "../utils/consts";
import {Option} from "antd/es/mentions";

const CallInfoCard = (props) => {

    const history = useHistory()

    const id = props.id
    const name = props.name

    let [data, setData] = useState([1])

    const setMO = (text) => {
        let searchParams = new URLSearchParams()
        searchParams.append('pollId', props.id)
        if (text) {searchParams.append('mo', text)}
        history.push(CALL_ROUTE_DETAIL + '?' + searchParams)
    }

    const onLoad = async (id) => {
        return await pollApi.getUniqMO(id)
    }

    useEffect(() => {
        if (id !== 1) {
            onLoad(id).then((r) => {
                setData(r.data)

            }).catch((e) => {
                console.log('Ошибка подгрузки МО')
                console.log(e)
            })
        }
    }, [id])


    let menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank"
                   onClick={(event) => setMO()}
                   key={'all'}
                >
                    Все МО
                </a>
            </Menu.Item>
            {data && data.map((p) => {
                return (
                    <Menu.Item>
                        <a target="_blank"
                           onClick={(event) => setMO(event.target.text)}
                           key={p}
                        >
                            {p}
                        </a>
                    </Menu.Item>
                )
            })}
        </Menu>
    )

    let menu2 = (<Select defaultValue="Все МО"
                         showSearch
                         style={{ width: 620 }}
                         onChange={setMO}>
            <Option value="ALL">Все МО</Option>
            {data && data.map((p) => {
                return (
                    <Option value={p}>
                        {p}
                    </Option>
                )
            })}
        </Select>
    )

    return (
        <Card title={name}
            //extra={<a href="#">More</a>}
              style={{width: 700}}>

            {/*<Dropdown overlay={menu} placement="bottomLeft">*/}
            {/*    <Button>Выбор МО</Button>*/}
            {/*</Dropdown>*/}

                {menu2}

        </Card>
    )
}

export default CallInfoCard