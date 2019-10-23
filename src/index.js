import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'; //deleted 'compose'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './Store/reducers/burgerBuilder';
import orderReducer from './Store/reducers/order';
import authReducer from './Store/reducers/auth';
import cartReducer from './Store/reducers/cart';
import { watchAuth } from './Store/sagas/index';

const composeEnhancers = (process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
    cart: cartReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);

const app = (
    <Provider store= {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
