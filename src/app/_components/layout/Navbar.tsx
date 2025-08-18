'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // optional icon library

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="w-full shadow-md">
			<div className="flex items-center justify-between h-16 px-6">
				{/* Logo / Home */}
				<Link href="/">
					<h1 className="text-2xl font-bold hover:text-gray-400 duration-150 ease-in">
						Home
					</h1>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex space-x-8">
					<Link href="/items">
						<h1 className="text-lg font-semibold hover:text-gray-400 duration-150 ease-in">
							Items
						</h1>
					</Link>
					<Link href="/contact">
						<h1 className="text-lg font-semibold hover:text-gray-400 duration-150 ease-in">
							Contact
						</h1>
					</Link>
				</div>

				{/* Mobile Hamburger */}
				<button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Mobile Dropdown */}
			{isOpen && (
				<div className="md:hidden px-6 pb-4 space-y-4">
					<Link href="/items" onClick={() => setIsOpen(false)}>
						<h1 className="block text-lg font-semibold hover:text-gray-400 duration-150 ease-in">
							Items
						</h1>
					</Link>
					<Link href="/contact" onClick={() => setIsOpen(false)}>
						<h1 className="block text-lg font-semibold hover:text-gray-400 duration-150 ease-in">
							Contact
						</h1>
					</Link>
				</div>
			)}
		</nav>
	);
}
