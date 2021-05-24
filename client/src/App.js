import {Layout} from 'antd';
import 'antd/dist/antd.css'
import HeaderNav from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

import React from "react";
import {useSelector} from "react-redux";
import SideMenu from "./components/SideMenu/SideMenu";

const {Footer} = Layout;

function App() {

    return (
            <BrowserRouter>
                <Layout className="layout">
                    <HeaderNav/>
                    {/*<AppRouter/>*/}
                    <SideMenu/>
                    {/*<Content style={{ padding: '0 50px' }}>*/}

                    {/*  */}
                    {/*</Content>*/}
                    <Footer style={{textAlign: 'center'}}>
                        ИАО АО "ГСМК"
                    </Footer>
                </Layout>
            </BrowserRouter>
    );
}

export default App;
