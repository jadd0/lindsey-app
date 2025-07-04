import { Input } from '@/app/_components/ui/input';
import { capitaliseFirstLetter } from '@/app/_lib/utils/usefulFunctions';
import { Label } from '@radix-ui/react-label';

interface ItemInputProps {
	type: 'title' | 'description' | 'price' | 'link';
	setValue: (value: any) => void;
}

export default function ItemInput({ type, setValue }: ItemInputProps) {
	return (
		<div className="grid w-full max-w-sm items-center gap-1">
			<Label>{capitaliseFirstLetter(type)}</Label>
			<Input
				type={type === 'price' ? 'number' : 'text'}
				step=".01"
				id={type}
				placeholder={capitaliseFirstLetter(type)}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}
