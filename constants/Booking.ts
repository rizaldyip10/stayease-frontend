export type BookingValueType = {
    checkInDate: string | null;
    checkOutDate: string | null;
    totalAdults: number | null;
    totalChildren: number | null;
    totalInfants: number | null;
};

export type BookingQueries = {
    [key: string]: any;
    checkInDate: string | null;
    checkOutDate: string | null;
    totalAdults: number | null;
    totalChildren: number | null;
    totalInfants: number | null;
    roomId: number | null;
};

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
};

export type BookingItemsDataType = {
    id: number;
    checkInDate: string;
    checkOutDate: string;
    price: number;
    room: {
        id: number;
        name: string;
    };
    isExtending: boolean | null;
    totalAdults: number;
    totalChildren?: number | null;
    totalInfants?: number | null;
}

export type BookingDataType = {
    id: string;
    user: {
        profileImg: string | null;
        firstName: string;
        lastName: string;
    };
    status: string;
    tenant: {
        profileImg: string | null;
        name: string;
    };
    bookingItem: BookingItemsDataType;
    totalPrice: number;
    createdAt: string;
    property: {
        image: string | null;
        name: string;
    }
};

export const tenantDummyData: BookingDataType[] = [
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Ubud"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Deluxe Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Lovina"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Studio One Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Nusa Dua"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Executive Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Nusa Dua"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Studio One Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Nusa Dua"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Studio One Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Nusa Dua"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Studio One Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Nusa Dua"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Studio One Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Nusa Dua"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Studio One Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Nusa Dua"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Studio One Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
    {
        id: "531haei-355-13faf",
        property: {
            image: null,
            name: "Villa Nusa Dua"
        },
        user: {
            profileImg: null,
            firstName: "John",
            lastName: "Doe"
        },
        status: "paid",
        tenant: {
            profileImg: null,
            name: "Villa Bali"
        },
        bookingItem: {
            id: 1,
            checkInDate: "2024-10-10 07:00:00.000",
            checkOutDate: "2024-10-12 07:00:00.000",
            isExtending: false,
            price: 250000,
            room: {
                name: "Studio One Bedroom",
                id: 1
            },
            totalAdults: 1,
        },
        totalPrice: 750000,
        createdAt: "2024-09-10 07:00:00.000",
    },
]