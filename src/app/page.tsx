import Image from 'next/image';

export default function HomePage() {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="relative w-220 h-auto aspect-[16/14]">
				<Image
					src="/LindseyShopHangingSign.png"
					alt="Lindsey Shop Logo"
					fill
					className="object-cover rounded"
				/>
			</div>
		</div>
	);
}
