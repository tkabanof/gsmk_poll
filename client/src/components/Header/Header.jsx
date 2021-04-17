import {Avatar, Button, Col, Menu, Row} from "antd";
import {Layout} from "antd";
import {useHistory} from "react-router-dom";
import s from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {wipeAuthData} from "../../features/auth";

const {Header} = Layout;

const UserCard = () => {

    const dispatch = useDispatch()
    const fio = useSelector(state => state.auth.fio)
    const changeUser = () => {
        dispatch(wipeAuthData())
    };

    return (
        <div className={s.userCard}>
            <Avatar
                style={{
                    backgroundColor: 'green',
                    verticalAlign: 'middle',
                }}
                size="large"
                //gap={2}
            >
                {fio}
            </Avatar>
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
        console.log('click ', e);
        history.push(e.key)
    };

    return (
        <Header>
            <Row>
                <Col span={18}>
                    <div className="logo"/>
                    <Menu theme="dark"
                          mode="horizontal"
                          defaultSelectedKeys={['2']}
                          onClick={handleClick}>
                        <Menu.Item key="/admin">Администратор</Menu.Item>
                        <Menu.Item key="/call">Звонки</Menu.Item>
                    </Menu>
                </Col>
                <Col span={6}>
                    <UserCard />
                </Col>

            </Row>
        </Header>
    )
}

export default HeaderNav