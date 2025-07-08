'use client';

import { useGetAllItems } from '../_hooks/items.hooks';
import { useState, useMemo } from 'react';
import { Item } from '../_shared/types';
import ItemPreview from '../_components/ssr/item/ItemPreview';
import ItemFilters from '../_components/ssr/item/ItemFilters';

export default function ItemsPage() {
	const { data, isLoading, isError } = useGetAllItems();
	const items = data?.data as Item[];

	const [category, setCategory] = useState<string | null>(null);

	const filteredItems = useMemo(() => {
		if (!items) return [];
		return items.filter((item) => {
			return category ? item.category === category : true;
		});
	}, [category]);

	return (
		<div className="flex flex-col items-center w-full h-full mt-5 overflow-x-hidden">
			<h1 className="text-3xl font-bold mb-4">Shop</h1>
			<ItemFilters categoryChange={(category) => setCategory(category)} />
			{isLoading && <div className="text-center mb-4">Loading items...</div>}

			{!isLoading && items.length > 0 && (
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-around gap-5 p-10">
					{' '}
					{filteredItems.map((item) => (
						<div className="" key={item.id}>
							<ItemPreview item={item} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
