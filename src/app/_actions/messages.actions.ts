'use server';

import { messagesServices } from '../_lib/backend/services/messages.services';
import { Message } from '../_shared/types';
import { requireAuth } from '../_lib/auth/backendAuth';
import { serialiseItem } from '../_lib/utils/date';
	 
// TODO: implement backend auth

export async function createNewMessageAction({
	message,
}: {
	message: Message;
}) {
	try {
		const result = await messagesServices.createNewMessage({ message });
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getAllMessagesAction() {
	try {
		if (!(await requireAuth())) return { error: 'Unauthorized' };

		const result = await messagesServices.getAllMessages();
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getRecentMessagesAction() {
	try {
		console.log('auth', await requireAuth());
		if (!(await requireAuth())) return { error: 'Unauthorized' };

		const result = await messagesServices.getRecentMessages();
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getMessageByIdAction(id: string) {
	try {
		if (!(await requireAuth())) return { error: 'Unauthorized' };

		const result = await messagesServices.getMessageById(id);
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function markMessageAsSeenAction(id: string) {
	try {
		if (!(await requireAuth())) return { error: 'Unauthorized' };

		const result = await messagesServices.markMessageAsSeen(id);
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function deleteMessageByIdAction(id: string) {
	try {
		if (!(await requireAuth())) return { error: 'Unauthorized' };

		const result = await messagesServices.deleteMessageById(id);
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}

export async function getMessagesPageAction(
	pageParam: number | null // cursor is number or null
): Promise<{ messages: any[]; nextCursor: number | null }> {
	try {
		if (!(await requireAuth())) throw new Error('Unauthorized');

		const result = await messagesServices.getMessagesPage(pageParam);
		const serialisedMessages = result.messages.map(serialiseItem);

		return {
			messages: serialisedMessages,
			nextCursor: result.lastCreatedAt,
		};
	} catch (error) {
		console.error('getMessagesPageAction error:', error);
		throw error;
	}
}
