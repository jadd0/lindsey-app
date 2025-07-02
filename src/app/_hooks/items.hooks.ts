import { useMutation, useQuery } from '@tanstack/react-query';
import {
	createItemAction,
	getCategoriesAction,
} from '../_actions/items.actions';
import { Item } from '../shared/types';

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
		mutationFn: async (item: Item) => {
			return await createItemAction(item);
		},
	});
};
