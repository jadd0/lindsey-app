'use server';

import { itemsServices } from '@/services/items.services';

export async function createItemAction(formData: FormData) {
	const item = {
		title: formData.get('title') as string,
		description: formData.get('description') as string,
		price: parseFloat(formData.get('price') as string),
		link: formData.get('link') as string,
		category: formData.get('category') as string,
		imageUrls: JSON.parse(formData.get('imageUrls') as string), // Parse if it's JSON
	};

	try {
		const result = await itemsServices.addItem(item);
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}
