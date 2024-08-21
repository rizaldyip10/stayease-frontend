import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full md:max-h-screen flex items-center justify-center bg-[#FAFAFA] py-5">
      <div className="bg-white max-h-screen md:h-1/3 flex flex-row items-center justify-center p-5 my-auto">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
