import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { Button } from "../../ui/button";

export default function Header() {
  return (
    <header className="w-full flex lg:gap-20 sm:gap-5 items-center justify-between px-8 py-4">
      <Link href="/">
        <Image src="/next.svg" alt="Logo" width={100} height={24} priority />
      </Link>
      <Navbar />
      <Button
        asChild
        className="hidden md:inline-flex lg:inline-flex ml-auto bg-brand! p-5 font-normal text-xs hover:bg-brand-hover!"
      >
        <Link href={"/login"}>Sign Up</Link>
      </Button>
    </header>
  );
}
