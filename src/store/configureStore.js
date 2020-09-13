import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import ARAMCOPaymentsReducer from './reducers/ARAMCOPaymentsReducer';

const storageReducer = combineReducers({
    ARAMCOPaymentsState: ARAMCOPaymentsReducer,
});


const configureStore = createStore(storageReducer, applyMiddleware(thunk));

export { configureStore };
