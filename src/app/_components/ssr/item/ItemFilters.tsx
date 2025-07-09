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
		<div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5">
			<CategoryFilter categoryChange={(category) => categoryChange(category)} />
			<PriceOrder
				priceOrderChange={(priceOrder) => priceOrderChange(priceOrder)}
			/>

			<ItemSearch searchChange={(search) => searchChange(search)} />
		</div>
	);
}
