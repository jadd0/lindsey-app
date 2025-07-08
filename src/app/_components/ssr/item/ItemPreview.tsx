import { Item } from '@/app/_shared/types';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

export default function ItemPreview({ item }: { item: Item }) {
	return (
		<div className="flex flex-col">
			<Carousel>
				<CarouselContent>
					{item.imageUrls!.map((imageUrl, index) => (
						<CarouselItem
							key={index}
							className="h-60 flex items-center justify-center"
						>
							<img
								src={imageUrl}
								alt={`Item image ${index + 1}`}
								className="object-cover w-full h-full"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<Link href={`${item.link}`} className="w-full h-full">
				<div className="flex flex-col gap-0 mt-3">
					<h2 className="text-xl font-bold">{item.title}</h2>
					<p className="text-lg">£{item.price.toFixed(2)}</p>
					<p className="text-md">{item.description}</p>
				</div>
			</Link>
		</div>
	);
}
