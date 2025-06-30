'use server';

import { itemsServices } from '@/services/items.services';

export async function createItemAction(formData: any) {
	const item = {
		title: formData.get('title'),
		description: formData.get('description'),
		price: parseFloat(formData.get('price')),
		link: formData.get('link'),
		category: formData.get('category'),
		imageUrls: formData.get('imageUrls'),
	};

	try {
		const result = await itemsServices.addItem(item);
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: error.message };
	}
}
