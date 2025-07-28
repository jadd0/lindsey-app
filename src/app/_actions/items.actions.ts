'use server';

import { itemsServices } from '@/services/items.services';
import { Item } from '@/types';
import { requireAuth } from '../_lib/auth/backendAuth';

// Helper: Converts Firestore Timestamp to JS Date
function serialiseItem(item: Item) {
	let createdAt: Date | null = null;

	if (item.createdAt) {
		if (item.createdAt instanceof Date) {
			createdAt = item.createdAt;
		} else if (
			typeof item.createdAt.seconds === 'number' &&
			typeof item.createdAt.nanoseconds === 'number'
		) {
			createdAt = new Date(
				item.createdAt.seconds * 1000 +
					Math.floor(item.createdAt.nanoseconds / 1e6)
			);
		}
	}

	return {
		...item,
		createdAt,
	};
}

export async function createItemAction(item: Item, images: File[]) {
	try {
		if (!(await requireAuth())) return { error: 'Unauthorized' };

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
		const serialised = result.map(serialiseItem);
		return { success: true, data: serialised };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getPaginatedItems(cursor: string | null) {
	const result = await itemsServices.getPaginatedItems(cursor);
	return { data: result.items, nextCursor: result.nextCursor };
}

export async function getFavouriteItemsAction() {
	try {
		const result = await itemsServices.getFavouriteItems();
		const serialised = result.map(serialiseItem);
		return { success: true, data: serialised };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function setNewFavouritesAction(
	id1: string,
	id2: string,
	id3: string
) {
	try {
		if (!(await requireAuth())) return { error: 'Unauthorized' };

		const result = await itemsServices.setNewFavourites(id1, id2, id3);
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getItemById(id: string) {
	try {
		const result = await itemsServices.getItemById(id);

		if (!result) {
			return { success: false, error: '' };
		}

		const serialised = serialiseItem(result);
		return { success: true, data: serialised };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function deleteItemById(id: string) {
	try {
		if (!(await requireAuth())) return { error: 'Unauthorized' };

		const result = await itemsServices.deleteItemById(id);
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}
