import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getHouses } from './houseIndexActions.jsx';

import { Link } from 'react-router-dom';

import { Table, Spin } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

class HouseIndex extends React.Component {
    componentDidMount() {
        this.props.getHouses();
    }

    render() {
        let housesInfo = this.props.housesInfo;
        let isLoading = this.props.isLoading;

        let columnsInfo = [
            {
                title: '№',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Дата публикации',
                dataIndex: 'creationDateTime',
                key: 'creationDateTime'
            },
            {
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'Действие',
                key: 'action',
                render: (text, record) => (
                    <Link to={"/house/read/" + record.id}><SearchOutlined/> Перейти</Link>
                )
            }
        ];

        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h3>Houses list</h3>

                <Table
                    dataSource={housesInfo}
                    columns={columnsInfo}
                    loading={isLoading}
                />
            </div>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        housesInfo: state.houseIndexReducer.housesInfo,
        error: state.houseIndexReducer.error,
        isLoading: state.houseIndexReducer.isLoading
    };
};

let mapActionsToProps = (dispatch) => {
    return {
        getHouses: () => dispatch(getHouses())
    };
};

export default connect(mapStateToProps, mapActionsToProps)(HouseIndex);