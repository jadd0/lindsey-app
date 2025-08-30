import Image from 'next/image';

export default function FirstTextSection() {
	return (
		<div className="w-screen mt-30 ml-30">
			<h2 className="text-3xl font-bold ml-10">i want you to</h2>
			<h1 className="text-8xl font-bold">
				be more{' '}
				<span className="italic underline text-[#ff568c]">quirky-er</span>
			</h1>
			<div className="flex  w-screen mt-15 ml-10">
				<div className="w-1/2 min-w-60 max-w-120">
					<p>
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
				</div>
				<div className="flex items-center justify-center py-6">
					<Image
						src="/mum.jpg"
						alt="Lindsey Shop Owner"
						width={240}
						height={240}
						className="rounded-full w-40 h-40 sm:w-60 sm:h-60 object-cover"
					/>
				</div>
			</div>
		</div>
	);
}
