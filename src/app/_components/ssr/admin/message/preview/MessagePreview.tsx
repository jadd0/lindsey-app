import { timeAgo } from '@/app/_lib/utils/date';
import { Message } from '@/app/_shared/types';
import Link from 'next/link';

export default function MessagePreview({ message }: { message: Message }) {
	return (
		<div>
			<Link href={`/admin/message/${message.id}`}>
				<li
					className={`p-4 border-b border-gray-200 ${
						message.seen ? '' : 'list-disc marker:text-red-500'
					}`}
				>
					<h2 className="text-lg font-semibold">{message.title}</h2>
					<p className="text-sm">From: {message.email}</p>
					<p className="text-xs">Date: {timeAgo(message.createdAt!)}</p>
				</li>
			</Link>
		</div>
	);
}
