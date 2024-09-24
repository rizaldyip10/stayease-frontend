"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

type PaymentQueryType = {
    id: string | null;
    bank: string | null;
}

export const usePaymentQuery = () => {
    const searchParams = useSearchParams();
    const [paymentQuery, setPaymentQuery] = useState<PaymentQueryType>({
        id: null,
        bank: null
    });

    useEffect(() => {
        const query = new URLSearchParams(searchParams);
        const id = query.get("id");
        const bank = query.get("bank");
        
        setPaymentQuery(prev => ({
            ...prev,
            id: id,
            bank
        }))
    }, [searchParams]);

    return paymentQuery;
}