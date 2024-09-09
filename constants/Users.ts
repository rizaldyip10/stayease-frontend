export type UserType = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userType: string;
    profileImg: string | null;
    createdAt: string;
};

export type TenantType = {
    id: number;
    user: UserType;
    bussinessName: string;
    registerDate: string;
}