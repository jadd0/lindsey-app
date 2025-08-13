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
	limit,
} from 'firebase/firestore';
import { Item, ItemUpdate } from '@/types';
import { db } from '../../firebase/firebase';
import { Message } from '@/types';

export const createNewMessage = async ({
	message,
}: {
	message: Message;
}): Promise<boolean> => {
	// todo: ensure good in services layer
	try {
		const docRef = await addDoc(collection(db, 'messages'), {
			...message,
			createdAt: new Date(),
		});
		return true;
	} catch (error) {
		throw new Error(
			`Error creating new message: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const getAllMessages = async (): Promise<Message[]> => {
	try {
		const messagesCollection = collection(db, 'messages');
		const messagesSnapshot = await getDocs(messagesCollection);
		const messagesList: Message[] = [];

		messagesSnapshot.forEach((doc) => {
			const data = doc.data() as Message;
			messagesList.push({ ...data, id: doc.id });
		});

		return messagesList;
	} catch (error) {
		throw new Error(
			`Error retrieving all messages: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const getMessageById = async (
	id: string
): Promise<Message | undefined> => {
	const allMessages = await getAllMessages();

	const message = allMessages.find((message) => message.id == id);

	if (!message) throw new Error('Error retrieving message, does not exist');

	return message;
};

export const markMessageAsSeen = async (id: string): Promise<boolean> => {
	try {
		const docRef = doc(db, 'messages', id);
		await updateDoc(docRef, {
			seen: true,
		});
		console.log('Message successfully marked as seen');
		return true;
	} catch (error) {
		throw new Error(
			`Error updating message ${id} due to error: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const deleteMessageById = async (id: string): Promise<boolean> => {
	try {
		const docRef = doc(db, 'messages', id);
		await deleteDoc(docRef);

		console.log('Messaege successfully deleted');

		return true;
	} catch (error) {
		throw new Error(
			`Error updating message ${id} due to error: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const getRecentMessages = async () => {
	try {
		const colRef = collection(db, 'messages');
		const q = query(colRef, orderBy('createdAt', 'desc'), limit(5));

		const querySnapshot = await getDocs(q);

		return querySnapshot;
	} catch (error) {
		throw new Error(
			`Error updating message ${id} due to error: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const messagesRepository = {
	createNewMessage,
	getAllMessages,
	getMessageById,
	markMessageAsSeen,
	deleteMessageById,
	getRecentMessages,
};
