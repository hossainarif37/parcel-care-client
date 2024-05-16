import { configureStore } from '@reduxjs/toolkit'
import navbarSlice from './slices/navbar/navbarSlice';
import userSlice from './slices/user/userSlice';


export const store = configureStore({
    reducer: {
        navbarSlice,
        userSlice
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;