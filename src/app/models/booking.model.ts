import {UserDetails} from "../services/auth/auth.service";

export interface Booking {
    userId: string;
    status: BookingStatus;
    user?: UserDetails;
}

export interface BookingIntent {
    roomId: number;
    time: number
}

export enum BookingStatus {
    PLANNED,
    UNVERIFIED,
    VERIFIED
}

export interface OpeningHours {
    opening: number;
    closing: number;
}