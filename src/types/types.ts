// src/types/types.ts

import { ReactNode } from 'react';

export interface ChildrenType {
    children: ReactNode;
}

export interface IRootState {
    navbarSlice: INavbar;
}
export interface INavbar {
    isNavToggle: boolean,
    isProfileDropdown: boolean;
}