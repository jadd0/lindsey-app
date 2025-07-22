import ItemsPreviewWithFilters from "../_components/ssr/item/ItemsPreview";

export default function ItemsPage() {
	return (
		<div className="flex flex-col items-center w-full h-full">
			<h1 className="text-3xl font-bold mb-4">Shop</h1>
			<ItemsPreviewWithFilters />
		</div>
	);
}