import {Polls} from "./Polls/Polls";
import { Layout, Menu} from 'antd';
import {
    NotificationOutlined,
    TeamOutlined
} from '@ant-design/icons';
import {useState} from "react";
import {Templates} from "./Template";


const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Admin = () => {

    const components = {
        21: <Polls /> ,
        22: <Templates />,
        3: <div >Option 3</div>,
        4: <div >Option 4</div>
    };

    const [render, updateRender] = useState(1);

    const handleMenuClick = menu => {
        console.log(menu.key)
        updateRender(menu.key);
    };

    return(
        <div>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        onClick={handleMenuClick}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {/*<SubMenu key="sub1" icon={<PhoneOutlined />} title="subnav 1">*/}
                        {/*    <Menu.Item key="1" >Звонки</Menu.Item>*/}

                        {/*</SubMenu>*/}
                        <SubMenu key="sub2" icon={<NotificationOutlined />} title="Опросы">
                            <Menu.Item key="21">Список опросов</Menu.Item>
                            <Menu.Item key="22">Шаблоны</Menu.Item>
                            <Menu.Item key="23">Вопросы</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<TeamOutlined />} title="Пользователи">
                            <Menu.Item key="31">Операторы</Menu.Item>
                            <Menu.Item key="32">Админы</Menu.Item>

                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {/*<Polls />*/}
                        {components[render]}
                    </Content>
                </Layout>
            </Layout>

        </div>
    )
}
export default Admin