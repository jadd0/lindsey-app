'use server';

import { redirect } from 'next/navigation';


import {
	markMessageAsSeenAction,
	getMessageByIdAction,
	deleteMessageByIdAction,
} from '@/app/_actions/messages.actions';
import MessageDeleteButton from '@/app/_components/ssr/admin/message/display/MessageDeleteButton';
import { timeAgo } from '@/app/_lib/utils/date';
import MessageEmailAddress from '@/app/_components/ssr/admin/message/display/MessageEmailAddress';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MessagePage({ params }: PageProps) {
  const { id } = await params;

	// Fetch message data
	const messageResult = await getMessageByIdAction(id);

	if (messageResult.error || !messageResult.data) {
		redirect('/admin/messages');
	}

	// Mark as seen
	await markMessageAsSeenAction(id);

	const message = messageResult.data;

	// For displaying how long ago it was created
	const createdAgo = timeAgo(message.createdAt!);

	// Delete handler with confirmation popup
	const handleDelete = async () => {
		if (confirm('Are you sure you want to delete this message?')) {
			await deleteMessageByIdAction(message.id!);
			redirect('/admin/messages');
		}
	};

	return (
		<div className="w-screen flex flex-col justify-center items-center p-6">
			<div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-3">
				{/* Header with Delete Button */}
				<div className="flex flex-col gap-2 items-center justify-between">
					<h1 className="font-bold text-2xl">Message</h1>

					{/* Title */}
					<h2 className="font-bold text-xl text-black">{message.title}</h2>

					{/* Meta info */}
					<div className="flex items-center gap-3">
						<MessageEmailAddress email={message.email} />
						<p className="text-sm text-gray-500">{createdAgo}</p>
						<MessageDeleteButton id={message.id!} />
					</div>

					{/* Message content */}
					<p className="mt-4 text-gray-700 whitespace-pre-wrap">
						{message.message}
					</p>
				</div>
			</div>
		</div>
	);
}
