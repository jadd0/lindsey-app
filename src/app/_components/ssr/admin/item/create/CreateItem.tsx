'use client';

import { useState } from 'react';
import { MultipleImageUploader } from '@/components/image/upload/MultipleImageUploader';
import ItemInput from './ItemInput';
import { createItemAction } from '@/actions/items.actions';
import { toast } from 'sonner';
import { uploadMultipleImages } from '@/app/_lib/firebase/image';

export default function CreateItem() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0.0);
	const [link, setLink] = useState('');
	const [category, setCategory] = useState(''); // Add category state
	const [filesLocal, setFilesLocal] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		toast.message('Creating item...');
		setIsSubmitting(true);

		try {
			// Upload images and convert to URLs
			const imageUrls = await uploadMultipleImages(filesLocal);

			const formData = new FormData();
			formData.append('title', title);
			formData.append('description', description);
			formData.append('price', price.toString());
			formData.append('link', link);
			formData.append('category', category);
			formData.append('imageUrls', JSON.stringify(imageUrls));

			const result = await createItemAction(formData);

			if (result.success) {
				// Handle success
				console.log('Item created successfully:', result.data);
				toast.success('Item created successfully!');
				// Reset form
				setTitle('');
				setDescription('');
				setPrice(0.0);
				setLink('');
				setCategory('');
				setFilesLocal([]);
			} else {
				// Handle error
				console.error('Error creating item:', result.error);
				toast.error('Failed to create item. Please try again');
			}
		} catch (error) {
			console.error('Submission error:', error);
			toast.error('Failed to create item. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center justify-center gap-3"
		>
			<ItemInput type="title" setValue={setTitle} />
			<ItemInput type="description" setValue={setDescription} />
			<ItemInput type="price" setValue={setPrice} />
			<ItemInput type="link" setValue={setLink} />
			<ItemInput type="category" setValue={setCategory} />{' '}
			{/* Add category input */}
			<MultipleImageUploader
				onFilesChange={(files) => {
					setFilesLocal(files);
				}}
				files={filesLocal}
			/>
			<button
				type="submit"
				disabled={isSubmitting}
				className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
			>
				{isSubmitting ? 'Creating...' : 'Create Item'}
			</button>
		</form>
	);
}
