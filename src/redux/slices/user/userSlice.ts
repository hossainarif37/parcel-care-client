import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/types";

const initialState: IUser = {
    isAuthenticated: false,
    user: null,
    userLoading: true,
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload.user;
            state.isAuthenticated = payload.isAuthenticated;
            state.userLoading = false;
        },
        removeUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.userLoading = false;
        },
        setLoading: (state, { payload }) => {
            state.userLoading = payload;
        },
        updateUser: (state, { payload }) => {
            state.user = payload.user;
        }
    }
})


export const { setUser, removeUser, updateUser, setLoading } = userSlice.actions;

export default userSlice.reducer;