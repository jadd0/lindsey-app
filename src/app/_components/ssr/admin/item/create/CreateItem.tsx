"use server"

import { useState } from 'react';
import { MultipleImageUploader } from '@/components/image/upload/MultipleImageUploader';
import ItemInput from './ItemInput';
import { itemsServices } from '@/app/_lib/backend/services/items.services';

export default function CreateItem() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0.0);
	const [link, setLink] = useState('');

	async function handleCreateItem() {
		try {
			const item = {
				title,
				description,
				category,
				price,
				link,
				imageUrls
			};

			const response = await itemsServices.addItem(item);
			console.log('Item created successfully:', response);
		} catch (error) {
			console.error('Error creating item:', error);
		}
	}

	return <div className="flex flex-col items-center justify-center">
		<ItemInput type="title" setValue={setTitle} />
		<ItemInput type="description" setValue={setDescription} />
		<ItemInput type="price" setValue={setPrice} />
		<ItemInput type="link" setValue={setLink} />

	</div>;
}
