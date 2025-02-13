"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema } from "@/lib/validations";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";

const ContactForm = () => {
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ContactFormSchema>) => {
    console.log(data);
  };
  return (
    <div className="py-10">
      <h2 className="text-4xl font-bold mb-10">Get in Touch</h2>
      <div className="flex gap-10 max-md:flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-[70%] max-md:w-[100%]"
          >
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="font-bold p-6 bg-slate-200"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="font-bold p-6 bg-slate-200"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="font-bold p-6 bg-slate-200"
                      placeholder="Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="font-bold p-6 bg-slate-200 h-[250px]"
                      placeholder="Message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-black text-white font-bold px-4 py-6 max-md:w-full"
              type="submit"
            >
              Finish & Submit
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-4 max-md:justify-center max-md:items-center">
          <div className="bg-primary-100 h-[4rem] w-[4rem] flex items-center justify-center rounded-full">
            <MapPinIcon className="h-8 w-8 text-slate-500" />
          </div>

          <span className="font-[500] text-lg">
            Lorem 142 Str, 2534, Ipsum State, USA
          </span>
          <div className="bg-primary-100 h-[4rem] w-[4rem] flex items-center justify-center rounded-full">
            <PhoneIcon className="h-8 w-8 text-slate-500" />
          </div>
          <span className="font-[500] text-lg">+90 000 000 00 00</span>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
