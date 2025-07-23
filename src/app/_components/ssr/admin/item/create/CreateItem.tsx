'use client';

import { useEffect, useState } from 'react';
import { MultipleImageUploader } from '@/components/image/upload/MultipleImageUploader';
import ItemInput from './ItemInput';
import { toast } from 'sonner';
import { useCreateItem, useDeleteItemById } from '@/app/_hooks/items.hooks';
import CategorySelect from './CategorySelect';
import { itemValidationSchema } from '@/app/_shared/validation';
import { Item } from '@/app/_shared/types';

export default function CreateItem({ item }: { item?: Item }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0.0);
	const [link, setLink] = useState('');
	const [category, setCategory] = useState('');
	const [filesLocal, setFilesLocal] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [updateItem, setUpdateItem] = useState(false);

	const createItem = useCreateItem();
	const deleteItem = useDeleteItemById();

	

	useEffect(() => {
		if (item) {
			// If an item is provided, populate the form fields with its data
			setTitle(item.title);
			setDescription(item.description);
			setPrice(item.price);
			setLink(item.link || '');
			setCategory(item.category || '');

			if (item.imageUrls && item.imageUrls.length > 0) {
				addImagesToLocal();
			}

			setUpdateItem(true);
		}
	}, []);

	async function addImagesToLocal() {
		const files = await Promise.all(
			item!.imageUrls!.map(async (url, idx) => {
				const urlParts = url.split('/');
				const guessedFilename =
					urlParts[urlParts.length - 1].split('?')[0] || `file${idx}.jpg`;
				return urlToFile(url, guessedFilename);
			})
		);

		setFilesLocal(files);
	}

	function urlToFile(url: string, filename: string): Promise<File> {
		return fetch(url)
			.then((res) => res.blob())
			.then((blob) => new File([blob], filename, { type: blob.type }));
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		toast.message('Creating item...');
		setIsSubmitting(true);
		console.log(updateItem)
		if (updateItem) {
			console.log("hello")
			const { success, error } = await deleteItem.mutateAsync({
				id: item!.id!,
			});

			if (error) {
				toast.error(
					'Failed to delete existing item whilst updating. Please try again.'
				);
			}
			return;
		}

		try {
			const item = {
				title,
				description,
				price: parseFloat(price.toString()),
				link,
				category,
			};

			const validatedItemReturn = itemValidationSchema.safeParse(item);

			if (!validatedItemReturn.success) {
				toast.error('Please ensure all fields are filled out correctly.');
				return;
			}

			const { success, error } = await createItem.mutateAsync({
				item,
				images: filesLocal,
			});

			toast.message('Creating item...');

			if (success) {
				toast.success('Item created successfully!');
				document.location.reload();
			} else {
				toast.error('Failed to create item. Please try again');
			}
		} catch (error) {
			toast.error('Failed to create item. Please try again.');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center justify-center gap-3"
		>
			<ItemInput type="title" setValue={setTitle} value={title || ""} />
			<ItemInput type="description" setValue={setDescription} value={description || ""} />
			<ItemInput type="price" setValue={setPrice} value={price.toString() || ""} />
			<ItemInput type="link" setValue={setLink} value={link || ""} />
			<CategorySelect setValue={setCategory} value={item?.category || ""} />
			<MultipleImageUploader
				onFilesChange={(files) => {
					setFilesLocal(files);
				}}
				files={filesLocal}
			/>
			<button
				type="submit"
				disabled={createItem.isPending}
				className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
			>
				{createItem.isPending ? 'Creating...' : 'Create Item'}
			</button>
		</form>
	);
}
