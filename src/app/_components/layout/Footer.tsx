import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="w-screen mt-10 bg-white text-[#1e60e1] py-4 text-center flex flex-col justify-center items-center">
			<Image
				height={200}
				width={200}
				src={'/fatimaHand.png'}
				alt={'Fatima Hand image'}
			/>
			<p className="text-lg font-bold">Lindsey Shop</p>
			<p className="text-sm">&copy; {new Date().getFullYear()}</p>
			<p className="text-sm">All rights reserved.</p>
			<p>
				Designed by Jadd Al-Khabbaz:{' '}
				<Link href={'https://jadd.live'}>https://jadd.live</Link>
			</p>
		</footer>
	);
}
