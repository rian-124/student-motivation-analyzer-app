import Link from "next/link";

export default function Navbar () {
    return (
        <nav className="flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-gray-600">
            Home
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-gray-600">
            Fitur
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-gray-600">
            Alur
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-gray-600">
            Mulai Sekarang
          </Link>
        </nav>
    )
}