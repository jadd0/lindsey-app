import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { getMessagesPageAction } from '../_actions/messages.actions';

export const useGetMessagesPaginated = () => {
	return useInfiniteQuery({
		queryKey: ['messages', 'pages'],
		queryFn: ({ pageParam = null }) => getMessagesPageAction(pageParam),
		initialPageParam: null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});
};
