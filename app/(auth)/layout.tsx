import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-[100vh] w-full bg-primary-100 flex justify-center">
      {children}
    </div>
  );
};

export default Layout;
