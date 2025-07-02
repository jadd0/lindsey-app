'use server';

import { itemsServices } from '@/services/items.services';

export async function getCategoriesAction() {
	try {
		const result = await itemsServices.getAllCategories();
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}
