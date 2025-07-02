import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Function to upload multiple images to firebase
export const uploadMultipleImages = async (
	files: File[]
): Promise<string[]> => {
	const downloadURLs: string[] = [];

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const fileName = `images/${Date.now()}_${i}_${file.name}`;
		const storageRef = ref(storage, fileName);

		try {
			const snapshot = await uploadBytes(storageRef, file);
			const downloadURL = await getDownloadURL(snapshot.ref);
			downloadURLs.push(downloadURL);
			console.log(`File ${i + 1} uploaded successfully`);
		} catch (error) {
			console.error(`Error uploading file ${i + 1}:`, error);
			throw error;
		}
	}

	return downloadURLs;
};
