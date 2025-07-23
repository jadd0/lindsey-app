'use client';

import { Input } from '@/app/_components/ui/input';
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
import { useEffect, useState } from 'react';

export default function CategorySelect({
	setValue,
	value
}: {
	setValue: (value: string) => void;
	value: string;
}) {
	const [category, setCategory] = useState('');
	const [newCategory, setNewCategory] = useState('');
	const [localCategories, setLocalCategories] = useState<string[]>([]);

	const { data: categories, isLoading, error } = useGetCategories();

	useEffect(() => {
		console.log(value)
		if (value.length > 0) {
			console.log("hfhijdsxdkjbgbdfhjg")
			setCategory(value);
		}
	}, [])

	useEffect(() => {
		if (categories?.success) {
			setLocalCategories(categories.data!);
		} else if (categories?.error) {
			console.error('Error loading categories:', categories.error);
		}
	}, [categories]);

	// Handler to update both local state and parent
	const handleCategoryChange = (value: string) => {
		setCategory(value);
		setValue(value);
	};

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter' && newCategory.trim() !== '') {
			localCategories.push(newCategory.trim());
			setNewCategory('');
		}
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
				<Input
					value={newCategory}
					onChange={(e) => setNewCategory(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
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
					{localCategories.map((cat) => (
						<DropdownMenuRadioItem key={cat} value={cat}>
							{cat}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
