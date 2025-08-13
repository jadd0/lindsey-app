import { Message } from '@/app/_shared/types';

export default function MessagePreview({ message }: { message: Message }) {
	return (
		<div className={`w-full bg-${message.seen ? 'gray-400' : 'white'}`}></div>
	);
}
