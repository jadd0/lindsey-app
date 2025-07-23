import 'server-only';

import { Item, ItemUpdate } from '@/types';
import { itemsRepository } from '../repositories/items.repo';
import { capitaliseFirstLetter } from '@/app/_lib/utils/usefulFunctions';
import { cache } from 'react';
import { imageServices } from './image.services';
import { UploadedFileData } from 'uploadthing/types';

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

function extractImageUrls(
	images: (UploadedFileData | null | undefined)[] | null | undefined
): string[] {
	if (!images) {
		return [];
	}
	return images
		.filter((img): img is UploadedFileData => !!img)
		.map((image) => image.ufsUrl);
}

export const addItem = async (item: Item, images: File[]): Promise<boolean> => {
	item = capitaliseFields(item) as Item;

	const uploads = await imageServices.uploadPostImages(images);
	const imageUrls = extractImageUrls(uploads.successes);

	const result = itemsRepository.addItem({ ...item, imageUrls });

	return result;
};

export const getItem = async (id: string) => {
	const result = itemsRepository.getItem(id);

	return result;
};

export const getAllItems = cache(async (): Promise<Item[]> => {
	return await itemsRepository.getAllItems();
});

export const getPaginatedItems = cache(async (cursor: any) => {
	return await itemsRepository.getPaginatedItems(cursor);
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
	const item = await itemsRepository.getItemById(id);

	if (!item) return false;

	const result = itemsRepository.deleteItemById(id);
	const imageDeleteResult = imageServices.deleteImages(item.imageUrls!);

	if (!result || !imageDeleteResult) {
		return false;
	}

	return result;
};

export const getAllCategories = cache(async (): Promise<string[]> => {
	return (await itemsRepository.getAllCategories()) as string[];
});

export const getFavouriteItems = cache(async (): Promise<Item[]> => {
	return await itemsRepository.getFavouriteItems();
});

export const setNewFavourites = async (
	id1: string,
	id2: string,
	id3: string
) => {
	return await itemsRepository.setNewFavourites(id1, id2, id3);
};

export const getItemById = cache(async (id: string) => {
	if (!id) return false;

	return await itemsRepository.getItemById(id);
});

export const itemsServices = {
	addItem,
	getItem,
	getAllItems,
	getItemsByCategory,
	updateItemById,
	deleteItemById,
	getAllCategories,
	getPaginatedItems,
	getFavouriteItems,
	setNewFavourites,
	getItemById,
};
