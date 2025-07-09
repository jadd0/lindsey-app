import ItemFilter from './ItemFilter';
import PriceOrder from './PriceOrder';

export default function ItemFilters({
	categoryChange,
  priceOrderChange
}: {
	categoryChange: (category: string) => void;
	priceOrderChange: (priceOrder: string) => void;
}) {
	return (
		<div className="w-full h-15 border-2 border-red-800 grid grid-cols-2">
			<div className="flex items-center justify-center gap-5">
				<ItemFilter categoryChange={(category) => categoryChange(category)} />
				<PriceOrder priceOrderChange={(priceOrder) => priceOrderChange(priceOrder)} />

			</div>
		</div>
	);
}
