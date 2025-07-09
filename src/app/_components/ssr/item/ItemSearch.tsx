import { Search } from 'lucide-react';

export default function ItemSearch({
	searchChange,
}: {
	searchChange: (search: string) => void;
}) {
	return (
		<div className="w-full h-15 grid grid-cols-2">
			<div className="flex items-center justify-center gap-5">
				<div className="border-2 flex items-center rounded">
					<input
						type="text"
						placeholder="Search items..."
						onChange={(e) => searchChange(e.target.value)}
						className="p-2 rounded focus:outline-none"
					/>
					<Search className='mr-3' />
				</div>
			</div>
		</div>
	);
}
