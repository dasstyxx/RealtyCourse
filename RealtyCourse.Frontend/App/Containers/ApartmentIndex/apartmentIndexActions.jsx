import {
    GET_APARTMENTS_SUCCESS,
    GET_APARTMENTS_ERROR,
    GET_APARTMENTS_LOADING_IN_PROGRESS,
    HREF_APARTMENTCONTROLLER_GET_SINGLE
} from './apartmentIndexConstants.jsx';

import "isomorphic-fetch";

export function startReceivingApartments() {
    return {
        type: GET_APARTMENTS_LOADING_IN_PROGRESS
    };
}

export function receiveApartments(data) {
    return {
        type: GET_APARTMENTS_SUCCESS,
        apartmentsInfo: data
    };
}

export function errorReceiveApartments(err) {
    return {
        type: GET_APARTMENTS_ERROR,
        error: err
    };
}

export function getApartments(pagination) {
    let targetPage = !pagination.current ? 1 : pagination.current;
    let pageSize = !pagination.pageSize ? 10 : pagination.pageSize;

    let queryTrailer = "?page=" + targetPage + "&pageSize" + pageSize;

    return (dispatch) => {
        dispatch(startReceivingApartments());
        fetch(HREF_APARTMENTCONTROLLER_GET_SINGLE + queryTrailer)
            .then((response) => {
                var parsedJson = response.json();
                return parsedJson;
            }).then((data) => {
                dispatch(receiveApartments(data));
            }).catch((ex) => {
                dispatch(errorReceiveApartments(ex));
            });
    };
}