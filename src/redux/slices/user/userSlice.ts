import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/types";

const initialState: IUser = {
    isAuthenticated: false,
    user: null,
    userLoading: true,
}


export const usersSlice = createSlice({
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
        setLoading: (state) => {
            state.userLoading = false;
        },
        updateUser: (state, { payload }) => {
            state.user = payload.user;
        }
    }
})


export const { setUser, removeUser, updateUser, setLoading } = usersSlice.actions;

export default usersSlice.reducer;