import {Button, Card, Dropdown, Menu} from "antd";
import {pollApi} from "../../Api/Api";
import {useEffect, useState} from "react";

const CallInfoCard = (props) => {

    let [data, setData] = useState(1)
    let [sortParam, setSortParam] = useState("Признак")
    let [values, setValues] = useState(['1', '2'])
    let [value, setValue] = useState('Значение')

    const setSortParams = (value) => {
        setSortParam(value)
        setValues(data[sortParam])

    }
    const onLoad = async (id) => {
        return await pollApi.getPollFieldValueData(id)
    }

    useEffect(() => {
        onLoad(props.id).then((r) => {
            setData(r.data.keyValue)
        }).catch(() => {
            console.log('Ошибка')
        })
    }, [])

    let menu = (
        <Menu>
            {Object.keys(data).map((p) => {
                return (
                    <Menu.Item>
                        <a target="_blank"
                           onClick={(event) => setSortParams(event.target.text)}
                           key={p}
                        >
                            {p}
                        </a>
                    </Menu.Item>
                )
            })}
        </Menu>
    )
    let menu2 = (
        <Menu>
            {values.map((p) => {
                return (
                    <Menu.Item>
                        <a target="_blank"
                           onClick={(event) => setValue(event.target.text)}
                           key={p}
                        >
                            {p}
                        </a>
                    </Menu.Item>
                )
            })}
        </Menu>
    )
    return (
        <Card title={props.name}
            //extra={<a href="#">More</a>}
              style={{width: 700}}>
            <Dropdown overlay={menu} placement="bottomLeft">
                <Button>{sortParam}</Button>
            </Dropdown>
            <a> </a>
            <Dropdown overlay={menu2} placement="bottomLeft">
                <Button>{value}</Button>
            </Dropdown>
        </Card>
    )
}

export default CallInfoCard