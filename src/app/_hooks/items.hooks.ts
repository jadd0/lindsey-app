import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
	createItemAction,
	getAllItemsAction,
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

export const useGetAllItems = () => {
	return useQuery({
		queryKey: ['items', 'all'],
		queryFn: async () => {
			return getAllItemsAction();
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

export const useGetAllItemsPaginated = () => {
	return useInfiniteQuery({
		queryKey: ['items', 'allItems'],
		queryFn: ({ pageParam = null }: { pageParam?: string | null }) =>
			getPaginatedItems(pageParam),
		initialPageParam: null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});
};
