import ItemFilter from './ItemFilter';

export default function ItemFilters({
	categoryChange,
}: {
	categoryChange: (category: string) => void;
}) {
	return (
		<div className="w-full h-15 border-2 border-red-800 grid grid-cols-2">
			<div className="flex items-center justify-center">
				<ItemFilter categoryChange={(category) => categoryChange(category)} />
			</div>
		</div>
	);
}
