import {Avatar, Button, Col, Menu, Row} from "antd";
import {Layout} from "antd";
import {useHistory} from "react-router-dom";
import s from './Header.module.css'

const {Header} = Layout;

const UserCard = () => {

    const changeUser = () => {

        console.log('User changed')
    };

    return (
        <div className={s.userCard}>
            <Avatar
                style={{
                    backgroundColor: 'yellow',
                    verticalAlign: 'middle',
                }}
                size="large"
                //gap={2}
            >
                {'UserInfo'}
            </Avatar>
            <Button
                size="small"
                style={{
                    margin: '0 16px',
                    verticalAlign: 'middle',
                }}
                onClick={changeUser}
            >
                ChangeUser
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
                        <Menu.Item key="/call'">Звонки</Menu.Item>
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