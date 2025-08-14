import 'server-only';

import { messagesRepository } from '../repositories/messages.repo';
import { cache } from 'react';
import { Message } from '@/types';
import { messageValidationInsertSchema } from '@/app/_shared/validation';
import { z } from 'zod';

export const createNewMessage = async ({ message }: { message: Message }) => {
	try {
		const validatedMessage = messageValidationInsertSchema.safeParse(message);

		if (validatedMessage.error) {
			throw new Error('Message did not meet the criteria');
		}

		await messagesRepository.createNewMessage({ message });
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
		const messages = await messagesRepository.getAllMessages();
		return messages;
	} catch (error) {
		throw new Error(
			`Error retrieving all messages: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const getMessageById = async (id: string) => {
	try {
		if (!id) {
			throw new Error('No id provided to retrieve');
		}

		const message = await messagesRepository.getMessageById(id);
		return message;
	} catch (error) {
		throw new Error(
			`Error retrieving message with id ${id}: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const markMessageAsSeen = async (id: string) => {
	try {
		if (!id) {
			throw new Error('No id provided to mark as seen');
		}

		const result = await messagesRepository.markMessageAsSeen(id);
		return result;
	} catch (error) {
		throw new Error(
			`Error marking message as seen with id ${id}: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const deleteMessageById = async (id: string) => {
	try {
		if (!id) {
			throw new Error('No id provided to delete');
		}

		const result = await messagesRepository.deleteMessageById(id);
		return result;
	} catch (error) {
		throw new Error(
			`Error deleting message with id ${id}: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const getRecentMessages = async () => {
	try {
		return await messagesRepository.getRecentMessages();
	} catch (error) {
		throw new Error(
			`Error retrieving recent messages: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const getMessagesPage = async (lastCreatedAt: number | null) => {
	try {
		return await messagesRepository.getMessagesPageByLastCreatedAt(
			lastCreatedAt
		);
	} catch (error) {
		throw new Error(
			`Error retrieving messages page: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`
		);
	}
};

export const messagesServices = {
	createNewMessage,
	getAllMessages,
	getMessageById,
	markMessageAsSeen,
	deleteMessageById,
	getRecentMessages,
	getMessagesPage,
};
