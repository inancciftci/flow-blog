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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { signUp } from "@/app/auth/auth-actions";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    const res = await signUp(formData);

    if (res.status === "success") {
      alert("success");
      router.push("/");
    } else {
      alert(res.status);
    }

    setLoading(false);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 py-10 w-[300px]"
        >
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
            disabled={loading}
            type="submit"
            className={`${
              loading ? "bg-gray-600 text-white" : "bg-primary-500"
            } rounded-md w-full px-12 py-3 text-sm font-medium `}
          >
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      <span>
        If you`re signed up alredy,{" "}
        <Link className="text-primary-500 font-bold" href={"/login"}>
          Sign In
        </Link>
      </span>
    </div>
  );
};

export default SignUpForm;
