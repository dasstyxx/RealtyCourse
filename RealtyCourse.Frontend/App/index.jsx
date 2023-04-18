import React from 'react';
import { render } from 'react-dom';
import App from './Containers/app.jsx';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import houseReadReducer from './Containers/HouseRead/houseReadReducer.jsx';
import houseIndexReducer from './Containers/HouseIndex/houseIndexReducer.jsx';
import apartmentReadReducer from './Containers/ApartmentRead/apartmentReadReducer.jsx';
import apartmentIndexReducer from './Containers/ApartmentIndex/apartmentIndexReducer.jsx';

import 'antd/dist/antd.css';

const rootReducer = combineReducers({
    houseReadReducer,
    houseIndexReducer,
    apartmentReadReducer,
    apartmentIndexReducer
});

function configureStore(initialStore) {
    return createStore(rootReducer, initialStore, applyMiddleware(thunk));
}

const store = configureStore();

render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('content')
);