import { ReactNode } from "react";
import PublicRoute from "@/components/PublicRoute";

const RegisterLayout = ({ children }: { children: ReactNode }) => {
  return <PublicRoute>{children}</PublicRoute>;
};

export default RegisterLayout;
