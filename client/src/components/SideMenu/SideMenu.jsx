import {Layout, Menu} from "antd";
import {NotificationOutlined, TeamOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import Sider from "antd/es/layout/Sider";
import AppRouter from "../AppRouter";
import {Content} from "antd/es/layout/layout";
import {CALL_ROUTE, POLL_ROUTE, Templates_ROUTE, USERS_ROUTE} from "../utils/consts";

const SideMenu = () => {
    return (
        <div>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <SubMenu key="sub1" icon={<NotificationOutlined/>} title="Опросы">
                            <Menu.Item key="11">
                                <Link to={CALL_ROUTE}/>Опросы
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" icon={<NotificationOutlined/>} title="Управление">
                            <Menu.Item key="21">
                                <Link to={POLL_ROUTE}/>Список опросов
                            </Menu.Item>
                            <Menu.Item key="22">
                                <Link to={Templates_ROUTE}/>
                                Шаблоны</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<TeamOutlined/>} title="Пользователи">
                            <Menu.Item key="31">
                                <Link to={USERS_ROUTE}/>
                                Пользователи</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <AppRouter/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default SideMenu