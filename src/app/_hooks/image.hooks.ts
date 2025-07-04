import { useMutation, useQuery } from '@tanstack/react-query';
import { uploadImagesAction } from '../_actions/image.actions';
import { Item } from '@/types';

export const useUploadImages = () => {
	return useMutation({
		mutationFn: async (images: File[]) => {
			return await uploadImagesAction(images);
		},
	});
};
