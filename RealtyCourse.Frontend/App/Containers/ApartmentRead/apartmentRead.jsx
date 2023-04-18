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

        let image_span = 12
        return (
            <div>
                <Divider orientation="center"><img key="apartment_logo" width={32} height={32} src="/images/interior-design.png" /> Информация о квартире</Divider>
                <Row style={{ marginTop: "80px" }}>
                    <Col span={image_span}>
                        <img key="apartment_image" max-width="100%" max-height="100%" src={"/images/apartments/" + apartmentInfo.imageName + ".jpg"} />
                    </Col>
                    <Col span={24 - image_span}>
                        <Descriptions column={1} title="Информация" bordered size="medium">
                            <Descriptions.Item label="ID">{apartmentInfo.id}</Descriptions.Item>
                            <Descriptions.Item label="Дата публикации">{apartmentInfo.creationDateTime}</Descriptions.Item>
                            <Descriptions.Item label="Стоимость">{apartmentInfo.price} ₽</Descriptions.Item>
                            <Descriptions.Item label="Жилая площадь">{apartmentInfo.livingSquare}</Descriptions.Item>
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