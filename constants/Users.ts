export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
  avatarUrl: string | null;
  joinedAt: string;
};

export type TenantType = {
  user: UserType;
  businessName: string;
  registerDate: string;
};
