import ItemsPreviewWithFilters from "../_components/ssr/item/ItemsPreview";

export default function ItemsPage() {
	return (
		<div className="flex flex-col items-center w-full h-full mt-10">
			<h1 className="text-3xl font-bold mb-4">Shop</h1>
			<p className="px-8">Please scroll below to view my collection of items, I am sure there is something for you!</p>
			<ItemsPreviewWithFilters />
		</div>
	);
}