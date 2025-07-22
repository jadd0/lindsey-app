import {
	collection,
	addDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
	UpdateData,
	deleteDoc,
	query,
	orderBy,
	startAfter,
	limit as limitFn,
} from 'firebase/firestore';
import { Item, ItemUpdate } from '@/types';
import { db } from '../../firebase/firebase';

// Inserts data with an auto-generated ID into the "items" collection
export const addItem = async (item: Item): Promise<boolean> => {
	try {
		const docRef = await addDoc(collection(db, 'items'), {
			...item,
			createdAt: new Date(),
		});
		console.log('Document written with ID: ', docRef.id);
		return true;
	} catch (error) {
		throw new Error(
			`Error adding item: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

// Get an item by a specific ID
export const getItem = async (id: string): Promise<Item | null> => {
	try {
		const docRef = doc(db, 'items', id);
		const itemSnapshot = await getDoc(docRef);

		if (itemSnapshot.exists()) {
			const data = itemSnapshot.data() as Item;
			return data;
		} else {
			console.log('No such document with ID:', id);
			return null;
		}
	} catch (error) {
		throw new Error(
			`Error retrieving item: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

// Get all items from the "items" collection in pages
export const getPaginatedItems = async (
	cursor: string | null = null,
	limit: number = 6
): Promise<{ items: Item[]; nextCursor: string | null }> => {
	try {
		const itemsCollection = collection(db, 'items');
		let q;

		if (cursor) {
			// Use orderBy and startAfter for pagination
			q = query(
				itemsCollection,
				orderBy('id'),
				startAfter(cursor),
				limitFn(limit)
			);
		} else {
			q = query(itemsCollection, orderBy('id'), limitFn(limit));
		}

		const itemsSnapshot = await getDocs(q);
		const itemsList: Item[] = [];

		itemsSnapshot.forEach((doc) => {
			const data = doc.data() as Item;
			itemsList.push({ ...data, id: doc.id });
		});

		// Set the next cursor to the last item's id, or null if no more items
		const nextCursor = (
			itemsList.length === limit ? itemsList[itemsList.length - 1].id : null
		) as string | null;

		return { items: itemsList, nextCursor };
	} catch (error) {
		throw new Error(
			`Error retrieving paginated items: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

// Get all items from the "items" collection
export const getAllItems = async (): Promise<Item[]> => {
	try {
		const itemsCollection = collection(db, 'items');
		const itemsSnapshot = await getDocs(itemsCollection);
		const itemsList: Item[] = [];

		itemsSnapshot.forEach((doc) => {
			const data = doc.data() as Item;
			itemsList.push({ ...data, id: doc.id });
		});

		return itemsList;
	} catch (error) {
		throw new Error(
			`Error retrieving all items: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

// Get a collection by category
export const getItemsByCategory = async (category: string): Promise<Item[]> => {
	try {
		const itemsCollection = collection(db, 'items');
		const itemsSnapshot = await getDocs(itemsCollection);
		const itemsList: Item[] = [];

		itemsSnapshot.forEach((doc) => {
			const data = doc.data() as Item;
			if (data.category === category) {
				itemsList.push({ ...data, id: doc.id });
			}
		});

		return itemsList;
	} catch (error) {
		throw new Error(
			`Error retrieving items by category: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

// Update an item by ID
export const updateItemById = async (
	id: string,
	updates: UpdateData<ItemUpdate>
): Promise<boolean> => {
	try {
		const docRef = doc(db, 'items', id);
		await updateDoc(docRef, updates);
		console.log('Document successfully updated');
	} catch (error) {
		throw new Error(
			`Error updating item ${id} due to error: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
	return true;
};

// Delete an item by ID
export const deleteItemById = async (id: string) => {
	try {
		const docRef = doc(db, 'items', id);
		await deleteDoc(docRef);
		console.log('Document successfully deleted');
	} catch (error) {
		throw new Error(
			`Error deleting item ${id} due to error: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
	return true;
};

// Get all of the categorgies available from each item
export const getAllCategories = async () => {
	const items = await getAllItems();
	const categories = new Set();

	items.forEach((item) => {
		if (item.category) {
			categories.add(item.category);
		}
	});
	return Array.from(categories);
};

export const getFavouriteItems = async (): Promise<Item[]> => {
	const items = await getAllItems();
	return items.filter((item) => item.favourite);
};

export const setNewFavourites = async (
	id1: string,
	id2: string,
	id3: string // new favourite id
) => {
	const currentFavourites = await getFavouriteItems();

	currentFavourites.forEach((favouriteItem) => {
		if (
			!(
				favouriteItem.id == id1 ||
				favouriteItem.id == id2 ||
				favouriteItem.id == id3
			)
		) {
			if (
				!updateItemById(favouriteItem.id!, {
					favourite: false,
				})
			)
				return false;
		}
	});

	if (!updateItemById(id1, { favourite: true })) return false;
	if (!updateItemById(id2, { favourite: true })) return false;
	if (!updateItemById(id3, { favourite: true })) return false;

	return true;
};

export const getItemById = async (id: string) => {
	const items = await getAllItems();

	const item = items.find((item) => item.id == id);

	if (!item) return false;
	return item;
};

export const itemsRepository = {
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
