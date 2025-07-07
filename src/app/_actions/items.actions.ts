'use server';

import { itemsServices } from '@/services/items.services';
import { Item } from '@/types';

export async function createItemAction(item: Item, images: File[]) {
	try {
		const result = await itemsServices.addItem(item, images);
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getCategoriesAction() {
	try {
		const result = await itemsServices.getAllCategories();
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getAllItemsAction() {
	try {
		const result = await itemsServices.getAllItems();
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getPaginatedItems(cursor: string | null) {
	const result = await itemsServices.getPaginatedItems(cursor);
	return { data: result.items, nextCursor: result.nextCursor };
}
