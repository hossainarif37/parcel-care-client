// src/types/types.ts

import { ReactNode } from 'react';

export interface ChildrenType {
    children: ReactNode;
}

export type UserType = {
    _id: string;
    name: string;
    email: string;
    profilePicture?: string;
    role: string;
}

export interface IUser {
    isAuthenticated: boolean;
    user: UserType | null
}
export interface IRootState {
    navbarSlice: INavbar;
    userSlice: IUser
}
export interface INavbar {
    isNavToggle: boolean,
    isProfileDropdown: boolean;
}

