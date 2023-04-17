import {
    GET_HOUSE_LOADING_IN_PROGRESS,
    GET_HOUSE_SUCCESS,
    GET_HOUSE_ERROR
} from './houseReadConstants.jsx';

const initialState = {
    houseInfo: {
        id: 1, address: null, buildYear: null, wallMaterial: null, maxFloor: null
    },
    isLoading: false,
    error: null
};

export default function house(state = initialState, action) {
    switch (action.type) {
        case GET_HOUSE_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };
        case GET_HOUSE_SUCCESS:
            return { ...state, isLoading: false, houseInfo: action.houseInfo };
        case GET_HOUSE_ERROR:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
}