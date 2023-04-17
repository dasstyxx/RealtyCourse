import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getHouses } from './houseIndexActions.jsx';

import { Link } from 'react-router-dom';

import { Table, Spin } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

class HouseIndex extends React.Component {
    componentDidMount() {
        this.props.getHouses(new Object());
    }

    handleTableChange(pagination, filters, sorter) {
        this.props.getHouses(pagination);
    }

    columnsInfo = [
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
            <Link to={"/house/read/" + record.id}><SearchOutlined /> Перейти</Link>
        )
    }
];

    render() {
        let housesInfo = this.props.housesInfo.map(item => ({...item, key: item.id}));
        let isLoading = this.props.isLoading;
        let totalCount = this.props.totalCount;

        return (
            <>
                <h3>Список домов</h3>

                <Table
                    dataSource={housesInfo}
                    columns={this.columnsInfo}
                    loading={isLoading}
                    pagination={{ total: totalCount }}
                    onChange={this.handleTableChange.bind(this)}
                />
            </>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        housesInfo: state.houseIndexReducer.housesInfo,
        totalCount: state.houseIndexReducer.totalCount,
        error: state.houseIndexReducer.error,
        isLoading: state.houseIndexReducer.isLoading
    };
};

let mapActionsToProps = (dispatch) => {
    return {
        getHouses: (pagination) => dispatch(getHouses(pagination))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(HouseIndex);