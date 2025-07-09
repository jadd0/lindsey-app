import ItemFilter from './ItemFilter';
import PriceOrder from './PriceOrder';
import ItemSearch from './ItemSearch';

export default function ItemFilters({
	categoryChange,
	priceOrderChange,
	searchChange,
}: {
	categoryChange: (category: string) => void;
	priceOrderChange: (priceOrder: string) => void;
	searchChange: (search: string) => void;
}) {
	return (
		<div className="w-full h-15 border-2 border-red-800 grid grid-cols-2">
			<div className="flex items-center justify-center gap-5">
				<ItemFilter categoryChange={(category) => categoryChange(category)} />
				<PriceOrder
					priceOrderChange={(priceOrder) => priceOrderChange(priceOrder)}
				/>
				<ItemSearch searchChange={(search) => searchChange(search)} />
			</div>
		</div>
	);
}
