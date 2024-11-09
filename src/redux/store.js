import { configureStore } from '@reduxjs/toolkit';
import envReducer from './env/envSlice';
import userReducer from './user/userSlice'

const store = configureStore({
    reducer: {
        env: envReducer,
        user: userReducer,
    },
});

export default store;
