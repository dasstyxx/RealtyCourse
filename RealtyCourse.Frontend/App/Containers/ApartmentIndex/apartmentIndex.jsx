import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getApartments } from './apartmentIndexActions.jsx';

import { Link } from 'react-router-dom';

import { Table, Spin } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

class ApartmentIndex extends React.Component {
    componentDidMount() {
        this.props.getApartments(new Object());
    }

    handleTableChange(pagination, filters, sorter) {
        this.props.getApartments(pagination);
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
            title: 'Жилая площадь',
            dataIndex: 'livingSquare',
            key: 'livingSquare'
        },
        {
            title: 'Этаж',
            dataIndex: 'floor',
            key: 'floor'
        },
        {
            title: 'Стоимость',
            key: 'price',
            render: (text, record) => (
                <div>{record.price} ₽</div>
            )
        },
        {
            title: 'Дом',
            key: 'house_action',
            render: (text, record) => (
                <Link to={"/house/read/" + record.houseId}><SearchOutlined /> Перейти</Link>
            )
        },
        {
            title: 'Квартира',
            key: 'apartment_action',
            render: (text, record) => (
                <Link to={"/apartment/read/" + record.id}><SearchOutlined /> Перейти</Link>
            )
        }
    ];

    render() {
        let apartmentsInfo = this.props.apartmentsInfo.map(item => ({ ...item, key: item.id }));
        let isLoading = this.props.isLoading;
        let totalCount = this.props.totalCount;

        return (
            <>
                <h3>Список квартир</h3>

                <Table
                    dataSource={apartmentsInfo}
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
        apartmentsInfo: state.apartmentIndexReducer.apartmentsInfo,
        totalCount: state.apartmentIndexReducer.totalCount,
        error: state.apartmentIndexReducer.error,
        isLoading: state.apartmentIndexReducer.isLoading
    };
};

let mapActionsToProps = (dispatch) => {
    return {
        getApartments: (pagination) => dispatch(getApartments(pagination))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(ApartmentIndex);