import { configureStore } from '@reduxjs/toolkit'
import navbarSlice from './slices/navbar/navbarSlice';
import userSlice from './slices/user/userSlice';
import { baseApi } from './api/baseApi';


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        navbarSlice,
        userSlice
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;