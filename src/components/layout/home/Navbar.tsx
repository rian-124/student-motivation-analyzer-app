"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "#features", label: "Metodologi" },
  { href: "#flow", label: "Alur Sistem" },
  { href: "#contact", label: "Informasi Proyek" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mobileTrigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="lg:hidden inline-flex items-center justify-center size-11 rounded-lg active:bg-brand/10 touch-manipulation"
      aria-label="Toggle Menu"
    >
      <Menu className="w-6 h-6 text-brand-secondary" />
    </button>
  );

  return (
    <div className="flex items-center">
      {/* Desktop Navigation */}
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="gap-8">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="text-sm font-bold text-brand-secondary/70 hover:text-brand transition-colors"
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile & Tablet Navigation — render Sheet only after mount to avoid Radix SSR hydration mismatch */}
      {mounted ? (
        <Sheet open={open} onOpenChange={setOpen}>
          {mobileTrigger}
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[350px] border-l border-white/20 bg-white/95 backdrop-blur-xl p-0"
          >
            <VisuallyHidden.Root>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden.Root>
            <SheetHeader className="p-8 border-b border-slate-100 text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-secondary flex items-center justify-center text-white text-xl font-black shadow-lg shadow-brand/20">
                  M
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-black text-brand-secondary tracking-tight">
                    Motivation
                  </span>
                  <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em] -mt-0.5 text-left">
                    Analyzer
                  </span>
                </div>
              </div>
            </SheetHeader>

            <nav className="flex flex-col p-8 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between group rounded-xl px-4 py-4 text-lg font-bold text-brand-secondary/80 hover:bg-brand/5 hover:text-brand transition-all"
                >
                  {item.label}
                  <ArrowRight
                    size={18}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  />
                </Link>
              ))}

              <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
                <Button
                  asChild
                  className="h-12 rounded-xl bg-brand hover:bg-brand-hover text-white font-bold shadow-lg shadow-brand/20"
                >
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Masuk
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        mobileTrigger
      )}
    </div>
  );
}
