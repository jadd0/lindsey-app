'use server';

import { Message } from '@/app/_shared/types';
import MessagePreview from './MessagePreview';
import { getRecentMessagesAction } from '@/app/_actions/messages.actions';

export default async function MessagePreviews() {
	const response = await getRecentMessagesAction();

	console.log(response);

	return (
		<div className="flex flex-col items-center">
			<ul className="list-disc">
				<h1 className="text-2xl font-bold">Recent Messages:</h1>
				{response.success &&
					response.data!.map((message) => <MessagePreview key={message.id} message={message} />)}
			</ul>
			<button>View more...</button>
		</div>
	);
}
