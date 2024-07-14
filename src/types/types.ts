export type UserType = {
    _id: string;
    name: string;
    email: string;
    profilePicture?: string;
    role: string;
    phoneNumber?: number;
    fullAddress?: string;
    subDistrict?: string;
    district?: string;
    isEmailVerified?: boolean;
    isProfileComplete?: boolean;
}

export interface IUser {
    isAuthenticated: boolean;
    user: UserType | null,
    userLoading: boolean;
}
export interface IRootState {
    navbarSlice: INavbar;
    userSlice: IUser
}
export interface INavbar {
    isNavToggle: boolean,
    isProfileDropdown: boolean;
    isDashboardToggle: boolean
}

