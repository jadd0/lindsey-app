interface ItemInputProps {
	type: 'title' | 'description' | 'price' | 'link';
	setValue: (value: string) => void;
}

export default function ItemInput({ type, setValue }: ItemInputProps) {}
