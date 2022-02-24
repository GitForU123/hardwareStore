import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import DBReducer from '../reducers/DBReducer';

const rootReducer = combineReducers({DBReducer});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
