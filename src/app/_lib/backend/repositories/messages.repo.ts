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
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

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

export const getRecentMessages = async (): Promise<Message[]> => {
	try {
		const messagesCollection = collection(db, 'messages');
		const recentMessagesQuery = query(
			messagesCollection,
			orderBy('createdAt', 'desc'),
			limit(5)
		);

		const messagesSnapshot = await getDocs(recentMessagesQuery);
		const messagesList: Message[] = [];

		messagesSnapshot.forEach((doc) => {
			const data = doc.data() as Message;
			messagesList.push({
				...data,
				id: doc.id,
			});
		});

		return messagesList;
	} catch (error) {
		throw new Error(
			`Error retrieving recent messages: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const getMessagesPageByLastCreatedAt = async (
	lastCreatedAt: number | null // cursor is JS timestamp (number)
): Promise<{ messages: Message[]; lastCreatedAt: number | null }> => {
	const messagesCollection = collection(db, 'messages');
	let q;

	if (lastCreatedAt) {
		q = query(
			messagesCollection,
			orderBy('createdAt', 'desc'),
			startAfter(new Date(lastCreatedAt)), // deserialize as JS Date
			limitFn(10)
		);
	} else {
		q = query(messagesCollection, orderBy('createdAt', 'desc'), limitFn(10));
	}

	const snapshot = await getDocs(q);
	const messagesList: Message[] = snapshot.docs.map((docSnap) => ({
		...(docSnap.data() as Omit<Message, 'id'>),
		id: docSnap.id,
	}));

	const lastVisible = snapshot.docs.length
		? snapshot.docs[snapshot.docs.length - 1]
				.data()
				.createdAt.toDate()
				.getTime() // as number
		: null;

	return { messages: messagesList, lastCreatedAt: lastVisible };
};

export const messagesRepository = {
	createNewMessage,
	getAllMessages,
	getMessageById,
	markMessageAsSeen,
	deleteMessageById,
	getRecentMessages,
	getMessagesPageByLastCreatedAt,
};
