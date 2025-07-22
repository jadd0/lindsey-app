'use client';

import { useGetAllItems } from '@/app/_hooks/items.hooks';
import { useState, useMemo } from 'react';
import { Item } from '@/app/_shared/types';
import ItemPreview from './ItemPreview';
import ItemFilters from './ItemFilters';
import ItemPreviewSkeleton from './ItemPreviewSkeleton';

export default function ItemsPreviewWithFilters({
	itemClicked,
	clickable = false,
}: {
	itemClicked?: (item: Item) => void;
	clickable?: boolean;
}) {
	const { data, isLoading, isError } = useGetAllItems();
	const items = (data?.data as Item[]) || [];

	const [category, setCategory] = useState<string | null>(null);
	const [priceOrder, setPriceOrder] = useState<string>('None');
	const [search, setSearch] = useState<string>('');

	const filteredItems = useMemo(() => {
		if (!items) return [];

		// Filter items based on category and search term
		const filteredItems = items
			.filter((item) => {
				return category ? item.category === category : true;
			})
			.filter((item) =>
				item.title.toLowerCase().includes(search.toLowerCase())
			);

		// Sort items based on price order
		if (priceOrder === 'Ascending') {
			return filteredItems.sort((a, b) => a.price - b.price);
		} else if (priceOrder === 'Descending') {
			return filteredItems.sort((a, b) => b.price - a.price);
		}

		return filteredItems;
	}, [isLoading, category, items, priceOrder, search]);

	return (
		<div className="flex flex-col items-center w-full h-full mt-5 overflow-x-hidden">
			<ItemFilters
				categoryChange={(category) => setCategory(category)}
				priceOrderChange={(priceOrder) => setPriceOrder(priceOrder)}
				searchChange={(search) => {
					setSearch(search);
				}}
			/>
			{isLoading && (
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-around gap-5 p-10">
					{Array.from({ length: 8 }).map((_, index) => (
						<ItemPreviewSkeleton key={index} />
					))}
				</div>
			)}

			{!isLoading && items.length > 0 && (
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-around gap-5 p-10">
					{filteredItems.map((item) => (
						<div className="" key={item.id}>
							<ItemPreview
								item={item}
								click={(itemClick) => itemClicked!(itemClick)}
								clickable={clickable}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
