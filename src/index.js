import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import Reducers from './reducers'
import TreasureHunter from './Component/TreasureHunter';

const store = createStore(
    Reducers,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <TreasureHunter />
    </Provider>,
    document.getElementById('root')
)