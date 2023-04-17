import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getApartment } from './apartmentReadActions.jsx';

import { Link } from 'react-router-dom';

import { Descriptions, Divider, Row, Col, Spin } from 'antd';
import { RollbackOutlined } from "@ant-design/icons";

class ApartmentRead extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getApartment(id);
    }

    render() {
        let apartmentInfo = this.props.apartmentInfo;
        let isLoading = this.props.isLoading;
        let error = this.props.error;

        if (isLoading) {
            return (
                <div style={{ textAlign: "center", marginTop: "200px" }}>
                    <Spin size={"large"} />
                </div>
            );
        }
        if (error) {
            return (
                <div>Error in data loading occured: {error}</div>
            );
        }

        return (
            <div>
                <Divider orientation="center">Информация о квартире</Divider>

                <Row>
                    <Col span={4}>
                        <img key="apartment_logo" width={160} height={160} src="/images/interior-design.png"></img>
                    </Col>
                    <Col span={20}>
                        <Descriptions bordered column={2}>
                            <Descriptions.Item label="ID">{apartmentInfo.id}</Descriptions.Item>
                            <Descriptions.Item label="Дата публикации">{apartmentInfo.creationDateTime}</Descriptions.Item>
                            <Descriptions.Item label="Стоимость" span={2}>{apartmentInfo.price}</Descriptions.Item>
                            <Descriptions.Item label="Жилая площадь">{apartmentInfo.livingSpace}</Descriptions.Item>
                            <Descriptions.Item label="Этаж">{apartmentInfo.floor}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <div style={{ textAlign: "center", marginTop: "50px", fontWeight: "bold" }}>
                    <Link to={"/apartment/index"}><RollbackOutlined/> Назад к списку квартир</Link>
                </div>
            </div>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        apartmentInfo: state.apartmentReadReducer.apartmentInfo,
        isLoading: state.apartmentReadReducer.isLoading,
        error: state.apartmentReadReducer.error
    };
};

let mapActionsToProps = (dispatch) => {
    return {
        getApartment: (id) => dispatch(getApartment(id))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(ApartmentRead);