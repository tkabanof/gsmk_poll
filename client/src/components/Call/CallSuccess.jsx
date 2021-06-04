import {Button, Result} from "antd";
import {useHistory} from "react-router-dom";
import {CALL_ROUTE} from "../utils/consts";

const CallSuccess = () => {
    const history = useHistory()
    const onClick = () => {
        history.push(CALL_ROUTE)
    }
    return (<Result
        status="success"
        title="Все люди в данном МО опрошены!"
        //subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
            <Button type="primary"
                    onClick = {onClick}
                    key="call">
                Вернутся к выбору опроса
            </Button>,
            //<Button key="buy">Buy Again</Button>,
        ]}
    />)
}
export default CallSuccess