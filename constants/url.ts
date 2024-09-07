export const config = {
  BASE_URL:
    `${process.env.NEXT_PUBLIC_BASE_URL}` || "http://localhost:8080/api/v1",
  endpoints: {
    auth: {
      status: "/auth/status",
      exchangeCode: "/auth/exchange-code",
      socialUserSelect: "/auth/user-select",
      login: "/auth/login",
      register: "/auth/register",
      verify: "/auth/register/verify",
      refreshToken: "/auth/refresh",
      logout: "/auth/logout",
    },
  },
};
