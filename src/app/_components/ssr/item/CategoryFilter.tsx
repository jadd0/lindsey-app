import { useGetCategories } from '@/app/_hooks/items.hooks';
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

export default function CategoryFilter({
	categoryChange,
}: {
	categoryChange: (category: string) => void;
}) {
	const { data, isLoading, error } = useGetCategories();
	const categories = data?.data as string[];

	const [category, setCategory] = useState('');

	useEffect(() => {
		categoryChange(category);
	}, [category]);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">
						{category === '' ? 'Choose Category' : category}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>Category</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
						{isLoading && (
							<DropdownMenuRadioItem value="" disabled>
								Loading categories...
							</DropdownMenuRadioItem>
						)}
						{error && (
							<DropdownMenuRadioItem value="" disabled>
								Error loading categories
							</DropdownMenuRadioItem>
						)}

						{/* No filter */}
						<DropdownMenuRadioItem value="">No Category</DropdownMenuRadioItem>

						{/* Render categories if available */}
						{!error &&
							!isLoading &&
							categories!.map((cat) => (
								<DropdownMenuRadioItem key={cat} value={cat}>
									{cat}
								</DropdownMenuRadioItem>
							))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
