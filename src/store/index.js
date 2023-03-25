import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from '../reducers';

const middleware = [];
middleware.push(thunk);

const persistConfig = {
    timeout : 0,
    key : 'root',
    whitelist : ['auth'],
    storage : AsyncStorage,
    migrate : createMigrate({
        debug : false
    })
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, {}, compose(applyMiddleware(...middleware)));
export const persistor = persistStore(store);