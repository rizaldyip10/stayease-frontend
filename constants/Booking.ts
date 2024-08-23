export type BookingValueType = {
    checkInDate: string | null;
    checkOutDate: string | null;
    totalAdults: number | null;
    totalChildren: number;
    totalInfants: number;
    checkInTime: string | null;
    checkOutTime: string | null;
    nonSmokingRoom: boolean | null;
    other: string | null;
    paymentMethod: string | null;
    bank: string | null;
}

export type BookingQueries = {
    [key: string]: any;
    checkInDate: string | null;
    checkOutDate: string | null;
    totalAdults: number | null;
    totalChildren: number | null;
    totalInfants: number | null;
    roomId: number | null;
}

export type BookingType = {
    booking: BookingValueType;
    setCheckInDate(newDate: string): void;
    setCheckOutDate(newDate: string): void;
    setTotalAdults(adults: number): void;
    setTotalChildren(children: number): void;
    setTotalInfants(infants: number): void;
    setCheckInTime(newTime: string): void;
    setCheckOutTime(newTime: string): void;
    setNonSmokingRoom(nonSmokingRoom: boolean): void;
    setOther(other: string): void;
    setPaymentMethod(paymentMethod: string): void;
    setBank(bank: string): void;
}