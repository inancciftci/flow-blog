import ContactForm from "@/components/ContactForm";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section>
      <div className="bg-primary-100 py-10">
        <div className=" container flex w-full justify-between">
          <div className="flex flex-col gap-10 w-[65%]">
            <h1 className="text-5xl font-bold">Contact</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adispisicing elit.
              Asperiores non dolor officiis eaque corporis.
            </p>
          </div>
          <div className="flex items-end">
            <div className="flex items-center">
              <Link className="font-[500] text-slate-400" href="/">
                Home
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-slate-400" />
              <Link className="font-[500]" href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <ContactForm />
      </div>
    </section>
  );
};

export default page;
