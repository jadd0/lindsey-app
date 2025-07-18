'use client';

import { useState } from 'react';
import { MultipleImageUploader } from '@/components/image/upload/MultipleImageUploader';
import ItemInput from './ItemInput';
import { toast } from 'sonner';
import { useCreateItem } from '@/app/_hooks/items.hooks';
import CategorySelect from './CategorySelect';
import { itemValidationSchema } from '@/app/_shared/validation';

export default function CreateItem() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0.0);
	const [link, setLink] = useState('');
	const [category, setCategory] = useState('');
	const [filesLocal, setFilesLocal] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const createItem = useCreateItem();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		toast.message('Creating item...');
		setIsSubmitting(true);

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
			<ItemInput type="title" setValue={setTitle} />
			<ItemInput type="description" setValue={setDescription} />
			<ItemInput type="price" setValue={setPrice} />
			<ItemInput type="link" setValue={setLink} />
			<CategorySelect setValue={setCategory} />
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
