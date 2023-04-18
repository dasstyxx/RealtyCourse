import {
    GET_HOUSES_SUCCESS,
    GET_HOUSES_ERROR,
    GET_HOUSES_LOADING_IN_PROGRESS
} from './houseIndexConstants.jsx';

const initialState = {
    housesInfo: [
        { id: 1, address: null, buildYear: null, wallMaterial: null, maxFloor: null },
    ],
    error: null,
    isLoading: false,
    totalCount: null
};

export default function houses(state = initialState, action) {
    switch (action.type) {
        case GET_HOUSES_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };

        case GET_HOUSES_SUCCESS:
            return { ...state, housesInfo: action.housesInfo, totalCount: action.totalCount, error: '', isLoading: false };

        case GET_HOUSES_ERROR:
            return { ...state, error: action.error, isLoading: false };

        default:
            return state;
    }
}