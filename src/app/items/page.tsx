import ItemsPreviewWithFilters from "../_components/ssr/item/ItemsPreview";

export default function ItemsPage() {
	return (
		<div className="flex flex-col items-center w-full h-full">
			<ItemsPreviewWithFilters />
		</div>
	);
}