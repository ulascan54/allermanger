"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

const links = [
  { name: "Home", href: "/" },
  // { name: "Edit Profile", href: "/user/edit" }, // Dinamik hale getireceğiz
  // { name: "Show Profile", href: "/profile" }, // Dinamik hale getireceğiz
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const userId = user?.id;

  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <div className="p-2">
            <Image src="/logo-black.svg" alt="logo" width={170} height={50} />
          </div>
        </Link>

        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link className="text-lg font-semibold text-primary" href={link.href}>
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          {userId && (
            <>
              <Link
                href={`/user/edit/${userId}`}
                className={pathname === `/user/edit/${userId}` ? "text-lg font-semibold text-primary" : "text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"}
              >
                Edit Profile
              </Link>
              <Link
                href={`/user/profile/${userId}`}
                className={pathname === `/user/profile/${userId}` ? "text-lg font-semibold text-primary" : "text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"}
              >
                Show Profile
              </Link>
            </>
          )}
        </nav>

        <div className="flex lg:hidden">
          <Button
            variant="outline"
            onClick={toggleMenu}
            className="flex flex-col gap-y-1.5 h-12 w-12 rounded-none"
          >
            <span className="text-lg font-semibold text-gray-600">☰</span>
          </Button>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
          >
            <div className="flex flex-col p-4">
              <Button variant="outline" onClick={toggleMenu} className="mb-4">
                <span className="text-lg font-semibold text-gray-600">✕</span>
              </Button>
              {links.map((link, idx) => (
                <div key={idx} className="mb-2">
                  {pathname === link.href ? (
                    <Link className="text-lg font-semibold text-primary" href={link.href} onClick={toggleMenu}>
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-lg font-semibold text-gray-800 transition duration-100 hover:text-primary"
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              {userId && (
                <>
                  <Link
                    href={`/user/edit/${userId}`}
                    className="text-lg font-semibold text-gray-800 transition duration-100 hover:text-primary mb-2"
                    onClick={toggleMenu}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    href={`/user/profile/${userId}`}
                    className="text-lg font-semibold text-gray-800 transition duration-100 hover:text-primary"
                    onClick={toggleMenu}
                  >
                    Show Profile
                  </Link>
                </>
              )}
              <div className="lg:flex items-center space-x-4">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
