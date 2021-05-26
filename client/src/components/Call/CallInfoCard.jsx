import {Button, Card, Dropdown, Menu} from "antd";
import {pollApi} from "../../Api/Api";
import {useEffect, useState} from "react";

const CallInfoCard = (props) => {


    let [data, setData] = useState(1)
    let [sortParam, setSortParam] = useState("Сортировка")
    let [values, setValues] = useState([])

    const onLoad = async (id) => {
        return await pollApi.getPollFieldValueData(id)
    }

    useEffect(() => {
        onLoad(props.id).then((r) => {
            setData(r.data.keyValue)
        })
    }, [])

    useEffect(()=> {
        setValues(data[sortParam])
    },[sortParam])

    let menu = (
        <Menu>
            {Object.keys(data).map((p)=>{
               return(
                   <Menu.Item>
                       <a target="_blank"
                          onClick={(event)=>setSortParam(event.target.text)}
                          key = {p}
                       >
                           {p}
                       </a>
                   </Menu.Item>
               )
            })}
        </Menu>
    );
    return (
        <Card title={props.name}
              //extra={<a href="#">More</a>}
              style={{width: 700}}>
            <Dropdown overlay={menu} placement="bottomLeft">
                <Button>{sortParam}</Button>
            </Dropdown>
            <a> </a>
            <Dropdown overlay={menu} placement="bottomLeft">
                <Button>{sortParam}</Button>
            </Dropdown>
        </Card>
    )
}

export default CallInfoCard