import { ChangeEvent } from "react";

export type EventType = ChangeEvent<HTMLInputElement>;

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

export interface IParcel {
    _id: string;
    senderId: string;
    senderName: string;
    senderEmail: string;
    senderPhoneNumber: number;
    senderAddress: {
        fullAddress: string;
        subDistrict: string;
        district: string;
    };
    parcelType: 'Document' | 'Box';
    parcelWeight: number;
    receiverName: string;
    receiverEmail: string;
    receiverPhoneNumber: number;
    deliveryAddress: {
        fullAddress: string;
        subDistrict: string;
        district: string;
    };
    requestedDeliveryDate: Date;
    price: number;
    paymentStatus: 'Unpaid' | 'Paid';
    deliveryStatus: 'Order Placed' | 'Pickup Agent Assigned' | 'Parcel Collected' | 'In Transit' | 'Delivery Hub Reached' | 'Delivery Agent Assigned' | 'Out For Delivery' | 'Delivered'
    deliveryStatusHistory: Array<{
        status: 'Order Placed' | 'Pickup Agent Assigned' | 'Parcel Collected' | 'In Transit' | 'Delivery Hub Reached' | 'Delivery Agent Assigned' | 'Out For Delivery' | 'Delivered';
        updatedAt: Date;
    }>,
    assignedAgentId?: string;
    assignedAgentRole?: 'pickup' | 'delivery';
    bookingDate: Date;
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

// Define types for district and sub-district data
export type SelectOptionType = {
    value: string;
    label: string;
};