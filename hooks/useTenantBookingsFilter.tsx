"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {TenantBookingsType} from "@/constants/Booking";

export const useTenantBookingsFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [queries, setQueries] = useState<TenantBookingsType>({
        page: null,
        size: null,
        direction: null,
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const page = params.get("page");
        const size = params.get("size");
        const direction = params.get("direction");

        setQueries(prev => ({
            ...prev,
            page: page ? +page : 0,
            size: size ? +size : 10,
            direction: direction ? direction : "DESC"
        }));
    }, [searchParams]);

    const setQuery = useCallback((newQuery: Partial<TenantBookingsType>) => {
        setQueries((prev) => {
            const updatedQueries= { ...prev, ...newQuery };
            const newParams = new URLSearchParams();

            Object.entries(updatedQueries).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    newParams.set(key, value.toString());
                }
            });
            router.push(`?${newParams.toString()}`);
            return updatedQueries;
        })
    }, [router]);

    return { queries, setQuery }
}