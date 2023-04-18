import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HouseIndex from './HouseIndex/houseIndex.jsx';
import HouseRead from './HouseRead/houseRead.jsx';
import ApartmentIndex from './ApartmentIndex/apartmentIndex.jsx';
import ApartmentRead from './ApartmentRead/apartmentRead.jsx';

import { Layout } from 'antd';
import Header from './Header/header.jsx';
const { Content, Footer } = Layout;

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Header/>

                    <Layout className="site-layout">
                        <Content style={{margin: "0 16px"} }>
                            <div style={{ textAlign: "center", marginTop: "35px" }}>
                                <h2 style={{ marginTop: "30px" }}>React Realty Course</h2>
                                <hr></hr>

                                <Switch>
                                    <Route path="/house/index" component={HouseIndex} />
                                    <Route path="/house/read/:id" component={HouseRead} />
                                    <Route path="/apartment/index" component={ApartmentIndex} />
                                    <Route path="/apartment/read/:id" component={ApartmentRead} />
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Realty Course, 2023</Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
};