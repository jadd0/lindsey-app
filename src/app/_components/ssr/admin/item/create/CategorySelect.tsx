'use client';

import { useGetCategories } from '@/app/_hooks/items.hooks';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

export default function CategorySelect({
	setValue,
}: {
	setValue: (value: string) => void;
}) {
	const [category, setCategory] = useState('');
	const { data: categories, isLoading, error } = useGetCategories();

	// Handler to update both local state and parent
	const handleCategoryChange = (value: string) => {
		setCategory(value);
		setValue(value);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					{category === '' ? 'Choose Category' : category}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Category</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={category}
					onValueChange={handleCategoryChange}
				>
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
					{/* Render categories if available */}
					{categories?.success &&
						categories.data!.map((cat) => (
							<DropdownMenuRadioItem key={cat} value={cat}>
								{cat}
							</DropdownMenuRadioItem>
						))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
