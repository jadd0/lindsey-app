import CategoryFilter from './CategoryFilter';
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
		<div className="w-full h-15 grid grid-cols-2">
			<div className="flex items-center justify-center gap-5">
				<CategoryFilter categoryChange={(category) => categoryChange(category)} />
				<PriceOrder
					priceOrderChange={(priceOrder) => priceOrderChange(priceOrder)}
				/>
			</div>
			<ItemSearch searchChange={(search) => searchChange(search)} />
		</div>
	);
}
