import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
};

const Page = () => {
  return <SignUpForm />;
};

export default Page;
