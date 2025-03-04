"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import { MailIcon, MenuIcon, XIcon } from "lucide-react";
import LoginButton from "../auth/LoginButton";

const MOBILE_NAV_ITEMS = [
  {
    id: 0,
    navTitle: "home",
    href: "/",
  },
  {
    id: 1,
    navTitle: "about",
    href: "/about",
  },
  {
    id: 2,
    navTitle: "contact",
    href: "/contact",
  },
  {
    id: 3,
    navTitle: "blog",
    href: "/blog",
  },
  {
    id: 4,
    navTitle: "CMS",
    href: "/admin/posts",
  },
];

const MobileNavbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const hideNavItemsVariant = {
    opened: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 1,
      y: "0%",
      transition: {
        delay: 1.1,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const mobileMenuVariant = {
    opened: {
      y: "0%",
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
    closed: {
      y: "-100%",
      transition: {
        delay: 0.35,
        duration: 0.63,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
  };

  const fadeInVariant = {
    opened: {
      opacity: 1,
      transition: {
        delay: 1.2,
      },
    },
    closed: { opacity: 0 },
  };

  const ulVariant = {
    opened: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.18,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  };

  const liVariant = {
    opened: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="container">
      <motion.nav
        className="flex justify-between items-center"
        initial="closed"
        animate={mobileNavOpen ? "opened" : "closed"}
      >
        <Link href="/" className="logo-container relative w-[100] h-[50]">
          <Image src={"/logo.svg"} fill alt="Logo" />
        </Link>
        <div className="menu-container flex gap-4 items-center">
          <LoginButton />
          <motion.div
            variants={hideNavItemsVariant}
            onClick={() => setMobileNavOpen(true)}
          >
            <MenuIcon className="size-7" />
          </motion.div>
        </div>
        <motion.div
          variants={mobileMenuVariant}
          className="mobile-menu z-50 text-white"
        >
          <motion.button
            variants={fadeInVariant}
            onClick={() => setMobileNavOpen(false)}
          >
            <XIcon className="size-7" />
          </motion.button>
          <motion.ul variants={ulVariant}>
            {MOBILE_NAV_ITEMS.map((navItem) => (
              <motion.li whileTap={{ scale: 0.95 }} key={navItem.id}>
                <motion.div variants={liVariant}>
                  <Link
                    onClick={() => setMobileNavOpen(false)}
                    href={navItem.href}
                  >
                    {navItem.navTitle}
                  </Link>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            variants={fadeInVariant}
            className="flex gap-4 justify-center items-center my-10"
          >
            <MailIcon className="size-5" /> <h5>enonch@hotmail.com</h5>
          </motion.div>
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default MobileNavbar;
