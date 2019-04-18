import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
//Redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const intitialState = {};
const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
    autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer,
    {},
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))

let persistor = persistStore(store);

export { store, persistor }
