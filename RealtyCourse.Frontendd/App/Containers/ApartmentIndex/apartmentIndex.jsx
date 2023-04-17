import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getApartments } from './apartmentIndexActions.jsx';

import { Link } from 'react-router-dom';

import { Table, Spin } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

class ApartmentIndex extends React.Component {
    componentDidMount() {
        this.props.getApartments();
    }

    render() {
        let apartmentsInfo = this.props.apartmentsInfo;
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
                title: 'Жилая площадь',
                dataIndex: 'livingSquare',
                key: 'livingSquare'
            },
            {
                title: 'Этажность',
                dataIndex: 'creationDateTime',
                key: 'creationDateTime'
            },
            {
                title: 'Стоимость',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: 'Дом',
                key: 'action',
                render: (text, record) => (
                    <Link to={"/house/read/" + record.houseId}><SearchOutlined /> Перейти</Link>
                )
            },
            {
                title: 'Квартира',
                key: 'action',
                render: (text, record) => (
                    <Link to={"/apartment/read/" + record.id}><SearchOutlined /> Перейти</Link>
                )
            }
        ];

        return (
            <>
                <h3>Список квартир</h3>

                <Table
                    dataSource={apartmentsInfo}
                    columns={columnsInfo}
                    loading={isLoading}
                />
            </>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        apartmentsInfo: state.apartmentIndexReducer.apartmentsInfo
    };
};

let mapActionsToProps = (dispatch) => {
    return {
        getApartments: () => dispatch(getApartments())
    };
};

export default connect(mapStateToProps, mapActionsToProps)(ApartmentIndex);