import { useEffect, useState } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function PriceOrder({
	priceOrderChange,
}: {
	priceOrderChange: (priceOrder: string) => void;
}) {
	const [priceOrder, setPriceOrder] = useState<string>('None'); // Ascending, Descending, None

	useEffect(() => {
		priceOrderChange(priceOrder);
	}, [priceOrder]);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className='text-black'>
						Price Ordering: {priceOrder}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>Price Order</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuRadioGroup value={priceOrder} onValueChange={setPriceOrder}>
						<DropdownMenuRadioItem value="None">None</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="Ascending">Ascending</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="Descending">Descending</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
