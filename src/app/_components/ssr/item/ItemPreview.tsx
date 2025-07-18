import { Item } from '@/app/_shared/types';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';

export default function ItemPreview({
	item,
	click,
	extraClass,
	clickable = false,
}: {
	item: Item;
	click?: (item: Item) => void;
	extraClass?: string;
	clickable?: boolean;
}) {
	return (
		<div className={'flex flex-col ' + extraClass} onClick={() => click!(item)}>
			<Carousel>
				<CarouselContent>
					{item.imageUrls!.map((imageUrl) => (
						<CarouselItem
							key={imageUrl}
							className="h-60 flex items-center justify-center relative"
						>
							<Image
								src={imageUrl}
								alt="Item image"
								fill
								className="object-cover w-full h-full rounded"
								sizes="(max-width: 768px) 100vw, 600px"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			{clickable && (
				<div className="flex flex-col gap-0 mt-3">
					<h2 className="text-xl font-bold">{item.title}</h2>
					<p className="text-lg">£{item.price.toFixed(2)}</p>
					<p className="text- font-light">{item.description}</p>
				</div>
			)}

			{!clickable && (
				<Link href={`${item.link}`} className="w-full h-full">
					<div className="flex flex-col gap-0 mt-3">
						<h2 className="text-xl font-bold">{item.title}</h2>
						<p className="text-lg">£{item.price.toFixed(2)}</p>
						<p className="text- font-light">{item.description}</p>
					</div>
				</Link>
			)}
		</div>
	);
}
