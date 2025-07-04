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
