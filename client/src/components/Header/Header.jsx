import {Button, Col, Menu, Row, Tag} from "antd";
import {Layout} from "antd";
import {useHistory} from "react-router-dom";
import s from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {wipeAuthData} from "../../features/auth";
import {LOGIN_ROUTE} from "../utils/consts";

const {Header} = Layout;

const UserCard = () => {

    const dispatch = useDispatch()
    const fio = useSelector(state => state.auth.fio)
    const role = useSelector(state => state.auth.role)
    const history = useHistory()

    const changeUser = () => {
        dispatch(wipeAuthData())
        history.push(LOGIN_ROUTE)
    };

    return (
        <div className={s.userCard}>
            <Tag color="blue">{role === 'admin' ? 'Администратор' : 'Оператор'}</Tag>
            <a>{fio ?? 'Без имени'}</a>
            <Button
                size="small"
                style={{
                    margin: '0 16px',
                    verticalAlign: 'middle',
                }}
                onClick={changeUser}
            >
                Выход
            </Button>
        </div>
    )
}


const HeaderNav = (props) => {
    const history = useHistory()
    const handleClick = e => {
        history.push(e.key)
    };

    return (
        <Header>
            <Row>
                <Col span={18}>
                </Col>
                <Col span={6}>
                    <UserCard/>
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderNav