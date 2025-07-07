'use client';

import { useGetAllItems } from '../_hooks/items.hooks';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Item } from '../_shared/types';
import ItemPreview from '../_components/ssr/item/ItemPreview';

export default function ItemsPage() {
	const { data, isLoading, isError } = useGetAllItems();
	const items = data?.data as Item[];

	return (
		<div className="flex flex-col items-center w-full h-full mt-5">
			<h1 className="text-3xl font-bold mb-4">Shop</h1>
			{isLoading && (
				<div className="text-center mb-4">Loading items...</div>
			)}

			{items.length > 0 && (
				<div className="w-full flex flex-col items-center">
					{items.map((item) => (
						<ItemPreview item={item} />
					))}
				</div>
			)}
		</div>
	);
}
