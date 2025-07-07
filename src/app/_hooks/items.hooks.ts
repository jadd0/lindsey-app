import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
	createItemAction,
	getCategoriesAction,
	getPaginatedItems,
} from '../_actions/items.actions';
import { Item } from '@/types';

export const useGetCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			return getCategoriesAction();
		},
	});
};

export const useCreateItem = () => {
	return useMutation({
		mutationFn: async ({ item, images }: { item: Item; images: File[] }) => {
			return await createItemAction(item, images);
		},
	});
};

export const useGetAllItems = () => {
	return useInfiniteQuery({
		queryKey: ['items', 'allItems'],
		queryFn: ({ pageParam = null }: { pageParam?: string | null }) =>
			getPaginatedItems(pageParam),
		initialPageParam: null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});
};
