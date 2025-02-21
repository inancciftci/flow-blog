import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button } from "./ui/button";

const routes = [
  { id: 1, name: "Home", path: ROUTES.HOME },
  { id: 2, name: "About", path: ROUTES.ABOUT },
  { id: 3, name: "Contact", path: ROUTES.CONTACT },
  { id: 4, name: "Blog", path: ROUTES.BLOG },
  { id: 5, name: "CMS", path: "/admin" },
];

const Header = () => {
  return (
    <header className="border-b-[1px] py-[1.5rem] max-md:py-[0.5rem] max-sm:bg-white border-slate-100">
      <div className="flex gap-[5rem] max-sm:justify-center items-center container">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
        <div className="flex items-center justify-between w-full max-sm:hidden">
          <ul className="flex gap-[2rem]">
            {routes.map((route) => (
              <li key={route.id}>
                <Link className="font-bold text-slate-800" href={route.path}>
                  {" "}
                  {route.name}{" "}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-[1rem] items-center">
            <MagnifyingGlassIcon className="size-5" />
            <Link href={"/"}>
              <Button className="button-primary">Deneme</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
