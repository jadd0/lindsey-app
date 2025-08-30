import Image from 'next/image';

export default function FirstTextSection() {
	const borderImages = [
		// Top border
		{ top: '-60px', left: '10%', width: '50px', rotate: '15deg' },
		{ top: '-70px', left: '40%', width: '60px', rotate: '-20deg' },
		{ top: '-50px', right: '20%', width: '45px', rotate: '30deg' },

		// Right border
		{ right: '-60px', top: '20%', width: '55px', rotate: '-15deg' },
		{ right: '-80px', top: '60%', width: '40px', rotate: '45deg' },

		// Bottom border
		{ bottom: '-60px', left: '15%', width: '65px', rotate: '-30deg' },
		{ bottom: '-50px', right: '25%', width: '50px', rotate: '20deg' },

		// Left border
		{ left: '-70px', top: '30%', width: '45px', rotate: '25deg' },
		{ left: '-60px', bottom: '40%', width: '55px', rotate: '-40deg' },
	];

	return (
		<div className="w-screen mt-30">
			<h2 className="text-3xl font-bold ml-30">i want you to</h2>
			<h1 className="text-8xl font-bold ml-40">
				be more{' '}
				<span className="italic underline text-[#ff568c]">quirky-er</span>
			</h1>
			<div className="flex justify-center items-center w-screen mt-20">
				<div className="relative w-1/2 min-w-60 max-w-120 z-10">
					<p className="font-semibold relative z-20">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi,
						sunt harum eius minima quaerat ut libero voluptatem consectetur, nam
						pariatur distinctio labore mollitia accusantium error deleniti
						excepturi, magni optio ipsam id assumenda quidem laboriosam nulla
						eveniet. Quisquam labore perspiciatis laborum dolore, repudiandae,
						delectus itaque consequuntur neque sapiente distinctio quis,
						dignissimos beatae quae! Molestiae nesciunt quisquam ratione,
						provident ipsa dolores velit iusto, magni rem recusandae repellat
						aliquid adipisci ducimus ex sed. Perspiciatis quae labore obcaecati
						in! Molestiae consequatur, incidunt expedita repudiandae perferendis
						quasi illum atque ab consectetur, dolorum vel laborum reprehenderit?
						Nemo mollitia architecto deleniti commodi, aliquam possimus sequi
						enim omnis!
					</p>

					{/* Random border images */}
					{borderImages.map((image, index) => (
						<div
							key={index}
							className="absolute pointer-events-none"
							style={{
								top: image.top,
								right: image.right,
								bottom: image.bottom,
								left: image.left,
								width: image.width,
								height: image.width,
								transform: `rotate(${image.rotate})`,
								zIndex: 5,
							}}
						>
							<img
								src="/evilEyes/cartoonishRoundEvilEye.png"
								alt="Border decoration"
								className="w-full h-full object-contain opacity-80"
								style={{
									filter: 'drop-shadow(2px 2px 6px rgba(0,0,0,0.2))',
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
