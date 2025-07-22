import { getItemById } from '@/app/_actions/items.actions';
import { Item } from '@/app/_shared/types';
import { notFound } from 'next/navigation'; // <-- For handling 404s

// Async page component, receives params
export default async function ItemPage({ params }: { params: { id: string } }) {
	const { id } = await params;
	const itemResult = await getItemById(id);

	console.log(itemResult)

	if (!itemResult || !itemResult.data) {
		notFound(); // This will render the built-in 404 page
	}

	const item = itemResult.data as Item;

	return (
		<div>
			<h1>{item.title}</h1>
			<p>{item.description}</p>
			{/* more item details... */}
		</div>
	);
}
