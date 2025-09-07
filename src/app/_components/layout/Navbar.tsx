"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, House, Store, Mail } from "lucide-react"; // optional icon library

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center items-center sticky top-6 z-1000">
      <nav className="p-3 gap-5 bg-white rounded-4xl flex flex-row flex-nowrap">
        <Link href={"/"}>
          <House color="black" width={20} />
        </Link>
        <Link href={"/items"}>
          <Store color="black" width={20} />
        </Link>
        <Link href={"/contact"}>
          <Mail color="black" width={20} />
        </Link>
      </nav>
    </div>
  );
}
