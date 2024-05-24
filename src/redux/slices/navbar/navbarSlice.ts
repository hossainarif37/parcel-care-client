import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { INavbar } from "../../../types/types"


const initialState: INavbar = {
    isNavToggle: false,
    isProfileDropdown: false,
    isDashboardToggle: false,
}


const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        toggleNav: (state, action: PayloadAction<boolean | undefined>) => {
            if (typeof action.payload === 'boolean') {
                state.isNavToggle = action.payload
            } else {
                state.isNavToggle = !state.isNavToggle
            }
        },
        toggleProfileDropdown: (state, action: PayloadAction<boolean | undefined>) => {
            if (typeof action.payload === 'boolean') {
                state.isProfileDropdown = action.payload;
            } else {
                state.isProfileDropdown = !state.isProfileDropdown;
            }
        },
        toggleDashboard: (state, action: PayloadAction<boolean | undefined>) => {
            if (typeof action.payload === 'boolean') {
                state.isDashboardToggle = action.payload;
            } else {
                state.isDashboardToggle = !state.isDashboardToggle;
            }
        }
    },
})


export const { toggleNav, toggleProfileDropdown, toggleDashboard } = navbarSlice.actions;

export default navbarSlice.reducer;