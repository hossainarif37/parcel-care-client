import { configureStore } from '@reduxjs/toolkit'
import navbarSlice from './slices/navbar/navbarSlice';


export const store = configureStore({
    reducer: {
        navbarSlice
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;