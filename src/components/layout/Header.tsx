import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between border-b px-8 py-4">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image src="/next.svg" alt="Logo" width={100} height={24} priority />
        </Link>
        <Navbar />
      </div>
      <Link
        href="/sign-up"
        className="btn-primary"
      >
        Sign Up
      </Link>
    </header>
  );
}
