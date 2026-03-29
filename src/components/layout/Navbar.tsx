"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/", label: "Fitur" },
  { href: "/", label: "Alur" },
  { href: "/", label: "Mulai Sekarang" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {/* Desktop */}
      <NavigationMenu className="hidden lg:flex text-[#627A95]">
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href={item.href} className="hover:text-brand-hover">{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile & Tablet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Image src="/menu.svg" alt="Menu" width={24} height={24} className="h-auto" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetTitle className="text-lg font-semibold px-4">Menu</SheetTitle>
          <nav className="flex flex-col gap-1 px-2 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm text-[#627A95] hover:bg-muted hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="mt-4 mx-2 rounded-lg bg-brand! py-2.5 text-center text-sm text-white hover:bg-brand-hover!"
            >
              Sign Up
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}