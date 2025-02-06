import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import TagCard from "./ui/tagcard";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { NewspaperIcon } from "@heroicons/react/20/solid";
import { Input } from "./ui/input";

const tags = [
  "Design",
  "Development",
  "SEO",
  "Marketing",
  "Creative",
  "Web",
  "Branding",
  "Agency",
];

const quickLinks = [
  { id: 1, name: "Home", path: ROUTES.HOME },
  { id: 2, name: "About me", path: ROUTES.ABOUT },
  { id: 3, name: "Contact", path: ROUTES.CONTACT },
  { id: 4, name: "Blog", path: ROUTES.BLOG },
  { id: 5, name: "Help & Support", path: "/" },
];

const Footer = () => {
  return (
    <footer>
      <div className="bg-primary-100">
        <div className="container">
          <div className="grid grid-cols-2 py-10 max-md:grid-cols-1 relative">
            <div className="flex justify-center flex-col gap-10">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <NewspaperIcon className="size-8 text-slate-500" />
                  <h3 className="text-slate-400 text-2xl font-[600]">
                    Subscribe
                  </h3>
                </div>
                <h3 className="text-3xl font-[700]">to Our Newsletter</h3>
              </div>
              <div className="flex gap-4 items-center">
                <Input
                  className="w-[20rem] bg-white p-6 font-bold z-[10]"
                  type="email"
                  placeholder="Enter your email"
                />
                <Button className="p-6 button-primary z-[4]">Subscribe</Button>
              </div>
            </div>
            <div className="relative grid place-items-end z-[1] max-md:absolute max-md:top-0 max-md:left-0 max-md:right-0 max-md:bottom-0">
              <Image
                width={190}
                height={190}
                alt="Subscribe Image"
                src={
                  "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/theme/sketch-1.png"
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark-100">
        <div className="container text-light-700 flex flex-col gap-4">
          <div className="flex justify-between py-[3rem] border-b-[1px] border-slate-800 max-md:flex-col max-md:items-center max-md:gap-10">
            <Image
              className="invert"
              src={"/logo.svg"}
              height={100}
              width={100}
              alt="logo"
            />
            <div className="flex items-center gap-[2rem] max-md:flex-col max-md:items-center max-md:gap-4">
              <p className="font-bold">All you need to build new site</p>
              <Button className="button-primary">Download Now</Button>
            </div>
          </div>
          <div className="flex gap-[5rem] border-b-[1px] border-slate-800 py-[3rem] max-md:flex-col max-md:gap-10">
            <div className="flex flex-col gap-4 w-[30%] max-md:w-full">
              <h3 className="text-2xl font-bold">About</h3>
              <p className="text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio
                suspendisse leo neque iaculis molestie sagittis maecenas aenean
                eget molestie sagittis.
              </p>
              <div>
                <h3 className="font-bold">Address</h3>
                <p className="text-slate-400">
                  123 Main Street New York, NY 10001
                </p>
              </div>

              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-slate-400">(+01) 234 567 89</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Quick link</h3>
              <ul className="flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <Link className="font-bold text-slate-400" href={link.path}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[25%] max-md:w-full">
              <h3 className="text-2xl font-bold mb-3">Tagcloud</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagCard key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </div>
          <div className="pb-[1rem]">
            <p className="font-bold">
              © 2021, Flow - Design by{" "}
              <span className="text-[#ffcca4]">AliThemes</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
