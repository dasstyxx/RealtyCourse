﻿import {
    GET_APARTMENTS_SUCCESS,
    GET_APARTMENTS_ERROR,
    GET_APARTMENTS_LOADING_IN_PROGRESS
} from './apartmentIndexConstants.jsx';

const initialState = {
    apartmentsInfo: [
        { id: 1, houseId: 1, floor: null, roomAmount: null, price: null, livingSquare: null }
    ],
    isLoading: false,
    error: null,
    totalCount: null
};

export default function apartments(state = initialState, action) {
    switch (action.type) {
        case GET_APARTMENTS_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };

        case GET_APARTMENTS_SUCCESS:
            return { ...state, apartmentsInfo: action.apartmentsInfo, totalCount: action.totalCount, error: '', isLoading: false };

        case GET_APARTMENTS_ERROR:
            return { ...state, error: action.error, isLoading: false };

        default:
            return state;
    }
}