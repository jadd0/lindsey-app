'use client';

import { useGetMessagesPaginated } from '@/app/_hooks/messages.hooks';
import MessagePreview from '@/app/_components/ssr/admin/message/preview/MessagePreview';
import { useEffect } from 'react';

export default function MessagesPage() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		error,
	} = useGetMessagesPaginated();

	// Flatten all message pages into a single array
	const messages = data?.pages.flatMap((page) => page.messages) ?? [];
  console.log(messages)

	useEffect(() => {
		function handleScroll() {
			if (
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 200
			) {
				if (hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			}
		}
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<div className="flex flex-col items-center w-full">
			<h1 className="text-3xl font-bold mb-4">Messages</h1>
			<p className="text-lg">View all messages here</p>
			<p className="text-md mb-4">Scroll to view more</p>

			{status === 'loading' && <p>Loading messages...</p>}
			{status === 'error' && (
				<p className="text-red-500">Error: {(error as Error).message}</p>
			)}

			<ul className="list-disc w-full max-w-2xl">
				{messages.map((message) => (
					<MessagePreview key={message.id} message={message} />
				))}
			</ul>

			{isFetchingNextPage && <p>Loading more...</p>}

			{!isFetchingNextPage && hasNextPage && (
				<button
					onClick={() => fetchNextPage()}
					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
				>
					Load More
				</button>
			)}

			{!hasNextPage && status === 'success' && (
				<p className="mt-4 text-gray-500">No more messages</p>
			)}
		</div>
	);
}
