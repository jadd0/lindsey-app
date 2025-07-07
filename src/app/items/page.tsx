'use client';

import { useGetAllItems } from '../_hooks/items.hooks';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Item } from '../_shared/types';

export default function ItemsPage() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useGetAllItems();
	const [items, setItems] = useState([] as Item[]);

	// Reference to the last item to observe
	const lastItemRef = useRef<HTMLDivElement | null>(null);

	// Intersection observer callback
	const lastItemElementRef = useCallback(
		(node: HTMLDivElement) => {
			if (isFetchingNextPage || !hasNextPage) return;

			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasNextPage) {
						fetchNextPage();
					}
				},
				{
					threshold: 0.1,
					rootMargin: '100px',
				}
			);

			if (node) {
				observer.observe(node);
				lastItemRef.current = node;
			}

			return () => {
				if (lastItemRef.current) {
					observer.unobserve(lastItemRef.current);
				}
			};
		},
		[isFetchingNextPage, hasNextPage, fetchNextPage]
	);

	useEffect(() => {
		if (data) {
			setItems((items) => [
				...items,
				...data.pages.flatMap((page) => page.data),
			]);
		}
	}, [data]);

	return <div className="flex flex-col items-center w-full h-full mt-5">
    <h1 className="text-3xl font-bold mb-4">Shop</h1>
      {isFetchingNextPage && (
        <div className="text-center mb-4">Loading more items...</div>
      )}
  </div>;
}
