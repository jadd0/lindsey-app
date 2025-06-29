import { useState } from 'react';

export default function CreateItem() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0.0);
	const [link, setLink] = useState('');

	return <div className="flex flex-col items-center justify-center">

  </div>;
}
