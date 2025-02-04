import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import TagCard from "./ui/tagcard";
import ROUTES from "@/constants/routes";
import Link from "next/link";

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
    <footer className=" bg-dark-100">
      <div className="container text-light-700 flex flex-col gap-4">
        <div className="flex justify-between py-[3rem] border-b-[1px] border-slate-800">
          <Image
            className="invert"
            src={"/logo.svg"}
            height={100}
            width={100}
            alt="logo"
          />
          <div className="flex items-center gap-[2rem]">
            <p className="font-bold">All you need to build new site</p>
            <Button className="button-primary">Download Now</Button>
          </div>
        </div>
        <div className="flex gap-[5rem] border-b-[1px] border-slate-800 py-[3rem]">
          <div className="flex flex-col gap-4 w-[30%]">
            <h3 className="text-xl font-bold">About</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio
              suspendisse leo neque iaculis molestie sagittis maecenas aenean
              eget molestie sagittis.
            </p>
            <div>
              <h3 className="font-bold">Address</h3>
              <p>123 Main Street New York, NY 10001</p>
            </div>

            <div>
              <h3 className="font-bold">Phone</h3>
              <p>(+01) 234 567 89</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Quick link</h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[25%]">
            <h3 className="text-lg font-bold mb-3">Tagcloud</h3>
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
    </footer>
  );
};

export default Footer;
