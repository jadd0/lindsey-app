import { Item } from '@/app/_shared/types';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

export default function ItemPreview({ item }: { item: Item }) {
	return (
		<div className="flex flex-col items-center border border-white-800 w-40">
			<Carousel>
				<CarouselContent>
					{item.imageUrls!.map((imageUrl, index) => (
						<CarouselItem
							key={index}
							className="w-64 h-64 flex items-center justify-center"
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
			<div className="p-4">
				<h2 className="text-lg font-bold">{item.title}</h2>
				<p className="text-xl font-semibold mt-2">£{item.price.toFixed(2)}</p>
			</div>
		</div>
	);
}
