import {
	collection,
	addDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
	UpdateData,
	deleteDoc,
} from 'firebase/firestore';
import { Item, ItemUpdate } from '../../../shared/types';
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

export const itemsRepository = {
	addItem,
	getItem,
	getAllItems,
	getItemsByCategory,
	updateItemById,
	deleteItemById,
};
