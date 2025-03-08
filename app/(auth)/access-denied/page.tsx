import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-10">
      <h2 className="text-2xl font-bold">
        Your account doesn&apos;t have access to CMS platform.
      </h2>
      <p>
        If you want to see the CMS, please continue with the following account.
      </p>
      <div className="text-center">
        <h3 className="text-lg font-bold">Admin Account</h3>
        <p className="text-sm text-slate-500">demoforthisproject@gmail.com</p>
        <p className="text-sm text-slate-500">demo1234</p>
      </div>
    </div>
  );
};

export default Page;
