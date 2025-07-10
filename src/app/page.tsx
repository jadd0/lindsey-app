import Image from 'next/image';

export default function HomePage() {
	return (
		<div className="flex flex-col w-full items-center justify-center overflow-x-hidden">
			{/* Landing page */}
			<div className="flex flex-col h-screen items-center justify-center w-screen mt-10">
				<div className="relative w-1/3 h-auto aspect-[16/14]">
					<Image
						src="/LindseyShopHangingSign.png"
						alt="Lindsey Shop Logo"
						fill
						className="object-cover rounded"
					/>
				</div>
			</div>

			{/* About me section */}
			<div className="grid grid-cols-2 w-full ml-30 space-between">
				{/* Text */}
				<div className="flex flex-col pt-15">
					<h2 className="text-4xl font-bold">About Me:</h2>
					<p className="mt-4 max-w-200">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, officia
						laborum natus fugiat vitae praesentium quos, possimus molestiae
						autem quisquam necessitatibus dolorum dicta quis neque cumque at
						soluta. A, saepe? Lorem ipsum dolor, sit amet consectetur
						adipisicing elit. Tempore, laudantium totam. A adipisci aut rerum
						est. Adipisci aliquid voluptas sequi eum, rerum accusantium nihil
						veniam, commodi maxime inventore quis molestiae?
					</p>
				</div>
				{/* Image */}
				<div className="flex items-center justify-center">
					<Image
						src="/mum.jpg"
						alt="Lindsey Shop Owner"
						width={300}
						height={300}
						className="rounded-full"
					/>
				</div>
			</div>
			{/* Our story */}
			<div className="grid grid-cols-2 w-full space-between mt-30">
				{/* Image */}
				<div className="flex items-center justify-center">
					<Image
						src="/hangingTree.png"
						alt="Bouganvillea Tree with Hanging Decoration"
						width={500}
						height={500}
						className="rounded-full"
					/>
				</div>
				{/* Text */}
				<div className="flex flex-col justify-center pt-15">
					<h2 className="text-4xl font-bold">All About The Story:</h2>
					<p className="mt-4 max-w-200">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, officia
						laborum natus fugiat vitae praesentium quos, possimus molestiae
						autem quisquam necessitatibus dolorum dicta quis neque cumque at
						soluta. A, saepe? Lorem ipsum dolor, sit amet consectetur
						adipisicing elit. Tempore, laudantium totam. A adipisci aut rerum
						est. Adipisci aliquid voluptas sequi eum, rerum accusantium nihil
						veniam, commodi maxime inventore quis molestiae?
					</p>
				</div>
			</div>
			{/* Featured content */}
		</div>
	);
}
