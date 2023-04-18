import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getHouse } from './houseReadActions.jsx';

import { Link } from 'react-router-dom';

import { Descriptions, Divider, Row, Col, Spin } from 'antd';
import { RollbackOutlined } from "@ant-design/icons";

class HouseRead extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getHouse(id);
    }

    render() {
        let houseInfo = this.props.houseInfo;
        let isLoading = this.props.isLoading;
        let error = this.props.error;

        if (isLoading) {
            return (
                <div style={{ textAlign: "center", marginTop: "200px" }}>
                    <Spin size={ "large" }/>
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
                <Divider orientation="center"><img key="apartment_logo" width={32} height={32} src="/images/home.png" /> Инофрмация о доме</Divider>

                <Row style={{ marginTop: "80px" }}>
                    <Col span={image_span}>
                        <img key="house_image" max-width="100%" max-height="100%" src={"/images/houses/" + houseInfo.imageName + ".jpg"} />
                    </Col>
                    <Col span={24 - image_span}>
                        <Descriptions column={1} title="Информация" bordered size="medium">
                            <Descriptions.Item label="ID">{houseInfo.id}</Descriptions.Item>
                            <Descriptions.Item label="Дата публикации">{houseInfo.creationDateTime}</Descriptions.Item>
                            <Descriptions.Item label="Адрес" span={2}>{houseInfo.address}</Descriptions.Item>
                            <Descriptions.Item label="Год постройки">{houseInfo.buildYear}</Descriptions.Item>
                            <Descriptions.Item label="Этажность">{houseInfo.maxFloor}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <div style={{ textAlign: "center", marginTop: "50px", fontWeight: "bold" }}>
                    <Link to={"/house/index"}><RollbackOutlined/> Назад к списку домов</Link>
                </div>
            </div>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        houseInfo: state.houseReadReducer.houseInfo,
        isLoading: state.houseReadReducer.isLoading,
        error: state.houseReadReducer.error
    };
}

let mapActionToProps = (dispatch) => {
    return {
        getHouse: (id) => dispatch(getHouse(id))
    };
};

export default connect(mapStateToProps, mapActionToProps)(HouseRead);