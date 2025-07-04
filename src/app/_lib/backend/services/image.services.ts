import { uploadthing } from '../../utils/uploadThing';
import { nanoid } from 'nanoid';

/**
 * The inferred result of a file upload using Uploadthing.
 * Typescript has issues inferring the correct type for the upload result.
 * This type is used to ensure that the result is correctly typed.
 */
type InferredUploadFileResult = Awaited<
	ReturnType<typeof uploadthing.uploadFiles>
>[number];

const ID_LENGTH = 7;

/**
 * upload post images to the cloud
 *
 * @param images image files to upload to the cloud
 * @returns
 */
export const uploadPostImages = async (images: File[]) => {
	try {
		const processedImageFiles = images.map((image) => {
			const imageFileExtension = image.name.split('.').at(-1);
			const imageFileName = `${nanoid(ID_LENGTH)}.${imageFileExtension}`;
			return new File([image], imageFileName, { type: image.type });
		});

		const uploadResults = await uploadthing
			.uploadFiles(processedImageFiles)
			.catch((error) => {
				console.error('UploadThing error:', error);
				throw new Error(
					`UploadThing error: ${error.message || JSON.stringify(error)}`
				);
			});

		const successfulUploads = uploadResults
			.filter((result) => result.data && !result.error)
			.map(({ data }) => data);

		const unsuccessfulUploads = uploadResults
			.filter((result) => !result.data || result.error)
			.map(({ error }) => error);

		if (unsuccessfulUploads.length > 0) {
			throw new Error(
				`Upload failed: ${JSON.stringify(unsuccessfulUploads[0])}`
			);
		}

		return {
			successes: successfulUploads,
			failures: unsuccessfulUploads.length,
		};
	} catch (error) {
		console.error('Error in uploadPostImages:', error);
		throw error;
	}
};

export const imageServices = {
	uploadPostImages,
};
