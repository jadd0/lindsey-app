import 'server-only';

import { Item, ItemUpdate } from '../../../shared/types';
import { itemsRepository } from '../repositories/items.repo';
import { capitaliseFirstLetter } from '@/app/_lib/utils/usefulFunctions';
import { cache } from 'react';

function capitaliseFields(item: ItemUpdate) {
	if (item.category) {
		item.category = capitaliseFirstLetter(item.category);
	}
	if (item.title) {
		item.title = capitaliseFirstLetter(item.title);
	}
	if (item.description) {
		item.description = capitaliseFirstLetter(item.description);
	}

	return item;
}

export const addItem = async (item: Item): Promise<boolean> => {
	item = capitaliseFields(item) as Item;

	const result = itemsRepository.addItem(item);

	return result;
};

export const getItem = async (id: string) => {
	const result = itemsRepository.getItem(id);

	return result;
};

export const getAllItems = cache(async (): Promise<Item[]> => {
	return await getAllItems();
});

export const getItemsByCategory = async (category: string) => {
	const result = itemsRepository.getItemsByCategory(
		capitaliseFirstLetter(category)
	);

	return result;
};

export const updateItemById = async (id: string, updates: ItemUpdate) => {
	updates = capitaliseFields(updates);

	const result = itemsRepository.updateItemById(id, updates);

	return result;
};

export const deleteItemById = async (id: string) => {
	const result = itemsRepository.deleteItemById(id);

	return result;
};

export const getAllCategories = cache(async (): Promise<string[]> => {
	return (await itemsRepository.getAllCategories()) as string[];
});

export const itemsServices = {
	addItem,
	getItem,
	getAllItems,
	getItemsByCategory,
	updateItemById,
	deleteItemById,
	getAllCategories,
};
