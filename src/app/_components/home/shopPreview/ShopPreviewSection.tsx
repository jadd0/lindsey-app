import { useGetFavouriteItems } from '@/app/_hooks/items.hooks';
import { Item } from '@/app/_shared/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import ItemPreview from '../../ssr/item/ItemPreview';
import ItemPreviewSkeleton from '../../ssr/item/ItemPreviewSkeleton';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BackgroundSectionHeading() {
	const {
		data: favouriteItemsResponse,
		isLoading,
		isError,
	} = useGetFavouriteItems();

	const [favouriteItems, setFavouriteItems] = useState<Item[]>([]);

	// Handle favourite items response
	useEffect(() => {
		if (favouriteItemsResponse?.data) {
			setFavouriteItems(favouriteItemsResponse.data);
		}
	}, [favouriteItemsResponse]);

	return (
		<div className="w-screen flex flex-col items-start justify-start">
			<div className="flex items-start justify-start py-6">
				<Image
					src="/cartoonishBougainvillieaSeperator.png"
					alt="Bougainvillea Seperator"
					width={0}
					height={0}
					sizes="70vw"
					className="w-[70vw] h-auto object-cover"
				/>
			</div>

			<div className="w-full grid gap-6 grid-cols-1 md:grid-cols-3">
				<Fade cascade damping={0.1} triggerOnce>
					{!isLoading &&
						!isError &&
						favouriteItems.map((item, index) => (
							<ItemPreview item={item} key={index} clickable={false} />
						))}
					{isLoading &&
						Array.from({ length: 3 }).map((_, index) => (
							<ItemPreviewSkeleton key={index} />
						))}
				</Fade>
			</div>
			<div className="w-full flex justify-center my-6">
				<Link href={'/items'}>
					<div className="flex flex-row gap-2 items-center">
						<h1 className="font-bold text-lg underline hover:text-blue-600 transition-colors">
							View more items
						</h1>
						<ArrowRight />
					</div>
				</Link>
			</div>
		</div>
	);
}
