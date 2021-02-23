import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import productReducer from './productsDuck.js'
import thunk from 'redux-thunk';

let rootReducer = combineReducers({
    products: productReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
        )
    return store;
}
