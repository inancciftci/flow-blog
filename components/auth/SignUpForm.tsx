"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import { signup } from "@/lib/actions/auth-actions";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //   const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
  //     try {
  //       const formData = new FormData();
  //       formData.append("username", data.username);
  //       formData.append("email", data.email);
  //       formData.append("password", data.password);
  //       toast.success("Successfully submitted ^.^");
  //       console.log(formData);
  //       console.log(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  return (
    <div className="h-[100vh] w-full bg-primary-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-sm p-10">
        <div className="w-full flex justify-center">
          <Image src={"/logo.svg"} height={250} width={75} alt="logo" />
        </div>

        <Form {...form}>
          <form className="space-y-8 py-10 w-[300px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input {...field} placeholder="Enter your username..." />
                  <FormMessage className="text-red-400 font-bold">
                    {form.formState.errors.username?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} placeholder="Enter your email..." />
                  <FormMessage className="text-red-400 font-bold">
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Enter your password..."
                  />
                  <FormMessage className="text-red-400 font-bold">
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Enter your password again..."
                  />
                  <FormMessage className="text-red-400 font-bold">
                    {form.formState.errors.confirmPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              formAction={signup}
              className="w-full bg-primary-500"
            >
              Sign Up
            </Button>
          </form>
        </Form>
        <span>
          If you`re signed up alredy,{" "}
          <Link className="text-primary-500 font-bold" href={"/sign-in"}>
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
