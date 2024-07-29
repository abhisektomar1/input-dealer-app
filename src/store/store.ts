import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import loginReducer from './loginSlice';
import navReducer from './NavSlice';
import lanReducer from './lanSlice';
// Configure persist options
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer for the login slice
const persistedLoginReducer = persistReducer(persistConfig, loginReducer);
const persistedNavReducer = persistReducer(persistConfig, navReducer);
const persistedLanReducer = persistReducer(persistConfig, lanReducer);



// Create the Redux store
const store = configureStore({
  reducer: {
    login: persistedLoginReducer,
    nav:persistedNavReducer,
    lan:persistedLanReducer
  },
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch