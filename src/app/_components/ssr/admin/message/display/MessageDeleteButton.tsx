'use client';

import { Trash2 } from 'lucide-react';
import { deleteMessageByIdAction } from '@/app/_actions/messages.actions';
import { useRouter } from 'next/navigation';

export default function MessageDeleteButton({
	id,
}: {
	id: string;
}) {
	const router = useRouter();

	const handleDelete = async () => {
		if (confirm('Are you sure you want to delete this message?')) {
			await deleteMessageByIdAction(id);
			router.push('/admin/messages');
		}
	};

	return (
		<button
			onClick={handleDelete}
			className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
			title="Delete Message"
		>
			<Trash2 size={24} />
		</button>
	);
}
