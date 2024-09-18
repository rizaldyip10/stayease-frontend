export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
  avatar: string | null;
  joinedAt: string;
};

export type TenantType = {
  user: UserType;
  bussinessName: string;
  registerDate: string;
};
