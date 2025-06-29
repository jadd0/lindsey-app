export default function Navbar() {
	return (
		<nav className="w-screen h-10">
			<div className="container mx-5 p-5 flex justify-between items-center absolute top-0">
				<a href="/" className="text-black text-lg font-bold">
					Home
				</a>
				<div>
					<a href="/about" className="text-gray-300 hover:text-black px-3 py-2">
						Shop
					</a>
					<a
						href="/contact"
						className="text-gray-300 hover:text-black px-3 py-2"
					>
						Contact
					</a>
				</div>
			</div>
		</nav>
	);
}
