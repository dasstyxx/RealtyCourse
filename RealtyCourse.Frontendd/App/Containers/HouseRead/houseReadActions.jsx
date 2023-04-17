import {
    GET_HOUSE_LOADING_IN_PROGRESS,
    GET_HOUSE_SUCCESS,
    GET_HOUSE_ERROR,
    HREF_HOUSECONTROLLER_GET_SINGLE
} from './houseReadConstants.jsx';

import 'isomorphic-fetch';

export function startReceiving() {
    return {
        type: GET_HOUSE_LOADING_IN_PROGRESS
    };
}

export function receiveHouse(data) {
    return {
        type: GET_HOUSE_SUCCESS,
        houseInfo: data.houseInfo
    };
}

export function errorReceiveHouse(data) {
    return {
        type: GET_HOUSE_ERROR,
        error: data.error
    };
}

export function getHouse(id) {
    return (dispatch) => {
        dispatch(startReceiving());

        fetch(HREF_HOUSECONTROLLER_GET_SINGLE + id)
            .then((response) => {
                var parsedJson = response.json();
                return parsedJson;
            })
            .then((data) => {
                dispatch(receiveHouse(data));
            })
            .catch((ex) => {
                dispatch(errorReceiveHouse(ex));
            })
    }
}