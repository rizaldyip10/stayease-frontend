export const config = {
  BASE_URL:
    `${process.env.NEXT_PUBLIC_BASE_URL}` || "http://localhost:8080/api/v1",
  endpoints: {
    auth: {
      status: "/auth/status",
      login: "/auth/login",
      logout: "/auth/logout",
      refreshToken: "/auth/refresh",
      refreshAccessToken: "/auth/refresh-access",
    },
    oauth2: {
      checkUserExists: "/oauth2/check-user-exists",
      registerOAuth2: "/oauth2/register",
      exchangeCode: "/oauth2/exchange-code",
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
    users: {
      profile: "/users/profile",
      tenant: "/users/profile/tenant",
      avatar: "/users/profile/avatar",
      email: "/users/profile/email",
    },
    properties: {
      getAllProperties: "/properties",
      getProperty: "/properties/{propertyId}",
      getTenantProperties: "/properties/tenant",
      getTenantRooms: "/properties/tenant/rooms",
      createProperty: "/properties",
      updateProperty: "/properties/{propertyId}",
      deleteProperty: "/properties/{propertyId}",
      getRooms: "/properties/{propertyId}/rooms",
      getRoom: "/properties/{propertyId}/rooms/{roomId}",
      createRoom: "/properties/{propertyId}/rooms",
      updateRoom: "/properties/{propertyId}/rooms/{roomId}",
      deleteRoom: "/properties/{propertyId}/rooms/{roomId}",
      getAllCategories: "/properties/categories",
      createCategory: "/properties/categories",
      updateCategory: "/properties/categories/{categoryId}",
      deleteCategory: "/properties/categories/{categoryId}",
    },
    bookings: {
      tenantBookings: "/bookings/tenant",
      userBookings: "/bookings/user",
    },
    transactions: {
      tenant: "/transactions",
      user: "/transactions/user",
    },
    payments: {
      paymentInfo: "/payments",
      uploadPayment: "/payments/payment-proof",
    },
  },
};
