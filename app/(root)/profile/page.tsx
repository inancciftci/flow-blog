import { Metadata } from "next";
import React from "react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Profile Page",
};

const Page = () => {
  return <div>Profile Page</div>;
};

export default Page;
