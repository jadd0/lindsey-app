'use server';

import { itemsServices } from '@/services/items.services';
import { Item } from '../shared/types';

export async function createItemAction(item: Item) {
	try {
		const result = await itemsServices.addItem(item);
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
