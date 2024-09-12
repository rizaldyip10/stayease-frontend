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
  },
};
