"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "@/app/auth/auth-actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const res = await signIn(formData);
    if (res.status === "success") {
      toast.success("You're being redirected to homepage!");
      router.push("/");
    } else {
      alert(res.status);
    }

    setLoading(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] py-10 space-y-8"
      >
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input {...field} type="email" placeholder="m@example.com" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link href="#" className="ml-auto text-sm underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                />
                <FormMessage />
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
            {loading ? "Loading..." : "Login"}
          </Button>
          <span className="text-center">
            If you don&apos;t have an account{" "}
            <Link className=" text-primary-500 font-bold" href={"/register"}>
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
}
