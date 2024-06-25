// store.ts
import { thunk } from 'redux-thunk';
import { configureStore  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Choose your storage engine
import rootReducers from './reducers/rootReducers'; // Import your root reducer

const persistConfig = {
  key: 'root',
  storage,
  // Specify the reducers you want to persist
  whitelist: ['auth', 'path'], // In this example, we persist the 'user' reducer
};
const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(middleware),
});

export const persistor = persistStore(store);   