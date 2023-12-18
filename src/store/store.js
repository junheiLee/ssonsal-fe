import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import loginUser from './loginUser'

const reducers = combineReducers({
  loginUser: loginUser.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginUser']
};

const persistedReducer = persistReducer(persistConfig, reducers);




const store =  configureStore({
  reducer: {
    loginUser: persistedReducer,
  }
}) 

export default store;