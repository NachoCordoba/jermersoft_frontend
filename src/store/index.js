import { createStore, combineReducers } from "redux";
import AuthReducer from "./reducers/auth.reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

/**
 * Persist Config
 */
const persistConfig = {
    key: 'root',
    storage
};

/**
 * Reducer List
 */
const reducers = combineReducers({
    auth: AuthReducer
});

/**
 * Persist State
 */
const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * Store
 */
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
