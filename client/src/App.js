import {Layout} from 'antd';
import 'antd/dist/antd.css'
import HeaderNav from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

import React from "react";
import {useSelector} from "react-redux";

const {Footer} = Layout;

function App() {

    const token = useSelector((state) => state.auth.token)
    const isAuth = !!token

    return (
            <BrowserRouter>
                <Layout className="layout">
                    <HeaderNav/>
                    <AppRouter/>
                    {/*<Content style={{ padding: '0 50px' }}>*/}

                    {/*  */}
                    {/*</Content>*/}
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </BrowserRouter>
    );
}

export default App;
