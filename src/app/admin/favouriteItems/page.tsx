'use client';

import ItemsPreviewWithFilters from '@/app/_components/ssr/item/ItemsPreview';
import { useGetFavouriteItems } from '@/app/_hooks/items.hooks';
import ItemPreview from '@/app/_components/ssr/item/ItemPreview';
import ItemPreviewSkeleton from '@/app/_components/ssr/item/ItemPreviewSkeleton';
import { Item } from '@/app/_shared/types';
import { useEffect, useState } from 'react';

export default function FavouriteItemsPage() {
	const {
		data: favouriteItemsResponse,
		isLoading,
		isError,
	} = useGetFavouriteItems();

	const [favouriteItems, setFavouriteItems] = useState<Item[]>([]);
	const [popupOpen, setPopupOpen] = useState(false);
	const [popupOpenIndex, setPopupIndex] = useState(-1);

	let selectedItem: Item | null = null;

	useEffect(() => {
		if (!favouriteItemsResponse?.data) return;

		const items: Item[] = [...favouriteItemsResponse.data];

		// Pad with blank items if less than 3
		if (items.length < 3) {
			const emptyItems = Array.from(
				{ length: 3 - items.length },
				() =>
					({
						id: '',
						title: '',
						description: '',
						price: 0,
						imageUrls: [],
						category: '',
						link: '',
					} as Item)
			);
			items.push(...emptyItems);
		}

		setFavouriteItems(items);
	}, [favouriteItemsResponse]);

	function handleIndexClick(index: number) {
		setPopupIndex(index);
		setPopupOpen(true);
	}

	function handleNewFavoruiteItem(itemClicked: Item) {
		console.log('hello');
		setFavouriteItems((prevItems) => {
			console.log(popupOpenIndex);
			const updatedItems = [...prevItems];
			if (popupOpenIndex >= 0 && popupOpenIndex < updatedItems.length) {
				updatedItems[popupOpenIndex] = itemClicked;
			}

			return updatedItems;
		});

		setPopupOpen(false);

		console.log(favouriteItems);
	}

	return (
		<div className="flex flex-col items-center w-full h-full">
			<h1 className="text-3xl font-bold mb-4">Favourite Items</h1>
			<p>
				This is a selector for you "favourite items". Click on any of the the
				three below to change them to another item from the created items
			</p>
			<div>
				{isLoading && (
					<div className="w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
						<ItemPreviewSkeleton />
						<ItemPreviewSkeleton />
						<ItemPreviewSkeleton />
					</div>
				)}
				{isError && <p>Error loading favourite items.</p>}
				{!isLoading && (
					<div className="w-[70vw] p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
						{favouriteItems.map((item, index) => (
							<div
								className="aspect-square border max-w-[300px] flex items-center justify-center cursor-pointer hover:scale-102 transition-transform duration-200 rounded"
								onClick={() => handleIndexClick(index)}
								key={index}
							>
								<ItemPreview item={item} clickable={true} extraClass='w-full p-5' />
							</div>
						))}
					</div>
				)}

				{popupOpen && (
					<div className="fixed inset-0 z-50 bg-[#1e60e1] w-screen h-screen">
						<ItemsPreviewWithFilters
							itemClicked={(itemClicked) => handleNewFavoruiteItem(itemClicked)}
							clickable={true}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
