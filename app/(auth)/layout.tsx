import Image from "next/image";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-[100vh] w-full bg-primary-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-sm p-10">
        <div className="w-full flex justify-center">
          <Image src={"/logo.svg"} height={250} width={75} alt="logo" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
