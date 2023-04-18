import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

import { Menu } from 'antd';
import { Layout } from 'antd';
const { Sider } = Layout;

export default class SideBar extends React.Component {

    render() {
        return (
            <Sider>
                <div className="logo"></div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={ ['1'] }>
                    <Menu.Item key="1">
                        <Link to={"/house/index"}>Просмотр домов</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={"/apartment/index"}>Просмотр квартир</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
};