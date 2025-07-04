'use server';

import { imageServices } from '@/services/image.services';

export async function uploadImagesAction(images: File[]) {
	try {
		const result = await imageServices.uploadPostImages(images);
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: (error as Error).message };
	}
}