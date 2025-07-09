import Link from 'next/link';

export default function Navbar() {
	return (
		<div className="w-full flex items-center h-10 p-5 pt-10">
			<Link href="/">
				<h1 className="text-2xl font-bold ml-10 hover:text-gray-400 duration-150 ease-in">
					Home
				</h1>
			</Link>
			<div className="ml-auto flex space-x-8 mr-5">
				<Link href="/items">
					<h1 className="text-2xl font-bold hover:text-gray-400 duration-150 ease-in">Items</h1>
				</Link>
				<Link href="/contact">
					<h1 className="text-2xl font-bold hover:text-gray-400 duration-150 ease-in">Contact</h1>
				</Link>
			</div>
		</div>
	);
}
