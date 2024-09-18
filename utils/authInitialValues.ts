import { FormType } from "@/constants/Types";

export const loginInitialValues = { email: "", password: "" };
export const registerInitialValues = { email: "" };
export const userTypeSelectInitialValues = {
  userType: "",
  businessName: "",
  taxId: "",
};

export const getInitialValues = (formType: FormType) => {
  switch (formType) {
    case "login":
      return loginInitialValues;
    case "register":
      return registerInitialValues;
    case "userType":
      return userTypeSelectInitialValues;
    default:
      return registerInitialValues;
  }
};
