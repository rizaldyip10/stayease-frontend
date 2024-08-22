import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#FAFAFA] py-5">
      {children}
    </div>
  );
};

export default AuthLayout;
