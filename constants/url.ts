export const config = {
    BASE_URL:
        `${process.env.NEXT_PUBLIC_BASE_URL}` || "http://localhost:8080/api/v1",
    endpoints: {
        auth: {
            status: "/auth/status",
            login: "/auth/login",
            logout: "/auth/logout",
            refreshToken: "/auth/refresh",
        },
        oauth2: {
            exchangeCode: "/oauth2/exchange-code",
            socialUserSelect: "/oauth2/user-select",
        },
        password: {
            forgot: "/password/forgot",
            reset: "/password/reset",
        },
        registration: {
            register: "/register",
            checkToken: "/register/check-token",
            verify: "/register/verify",
        },
        bookings: {
            tenantBookings: "/bookings/tenant",
            userBookings: "/bookings/user"
        },
        transactions: {
            tenant: "/transactions"
        },
        payments: {
            paymentInfo: "/payments",
            uploadPayment: "/payments/payment-proof"
        }
    },
};
