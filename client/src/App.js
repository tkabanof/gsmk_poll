import {Layout} from 'antd';
import 'antd/dist/antd.css'
import HeaderNav from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import SideMenu from "./components/SideMenu/SideMenu";

const {Footer} = Layout;

function App() {

    return (
            <BrowserRouter>
                <Layout className="layout">
                    <HeaderNav/>
                    <SideMenu/>
                    <Footer style={{textAlign: 'center'}}>
                        ИАО АО "ГСМК"
                    </Footer>
                </Layout>
            </BrowserRouter>
    );
}

export default App;
