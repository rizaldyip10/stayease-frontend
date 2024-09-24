"use client";

import {useCallback, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {BookingQueries} from "@/constants/Booking";

export const useBookingValues = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [bookingValues, setBookingValues] = useState<BookingQueries>({
        checkInDate: null,
        checkOutDate: null,
        totalAdults: null,
        totalChildren: null,
        totalInfants: null,
        roomId: null,
        propertyId: null
    });

    useEffect(() => {
        const query = new URLSearchParams(searchParams);
        const checkInDate = query.get("checkInDate");
        const checkOutDate = query.get("checkOutDate");
        const totalAdults = query.get("totalAdults");
        const totalChildren = query.get("totalChildren");
        const totalInfants = query.get("totalInfants");
        const roomId = query.get("roomId");
        const propertyId = query.get("propertyId");

        setBookingValues(prev => ({
            ...prev,
            checkInDate,
            checkOutDate,
            totalAdults: parseInt(totalAdults || "1"),
            totalChildren: totalChildren ? +totalChildren : null,
            totalInfants: totalInfants ? +totalInfants : null,
            roomId: +roomId!,
            propertyId: +propertyId!
        }));
    }, [searchParams]);

    const setBookingInfo = useCallback((newFilter: Partial<BookingQueries>) => {
        setBookingValues((prevFilters) => ({
            ...prevFilters,
            ...newFilter
        }));
    }, []);

    const saveToUrlParams = useCallback(() => {
        const params = new URLSearchParams();

        Object.entries(bookingValues).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.set(key, value.toString());
            }
        });

        router.push(`?${params.toString()}`);
    }, [bookingValues, router]);

    return {bookingValues, setBookingInfo, save: saveToUrlParams};
}