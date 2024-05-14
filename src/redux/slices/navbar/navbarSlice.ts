import { INavbar } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit"

const initialState: INavbar = {
    isNavToggle: false,
    isProfileDropdown: false,
}


const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        toggleNav: (state) => {
            state.isNavToggle = !state.isNavToggle
        },
        toggleProfileDropdown: (state) => {
            state.isProfileDropdown = !state.isProfileDropdown
        },
    },
})


export const { toggleNav, toggleProfileDropdown } = navbarSlice.actions;

export default navbarSlice.reducer;