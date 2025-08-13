import { Timestamp } from 'firebase/firestore';

export function timeAgo(createdAt: Timestamp | Date | number): string {
	let date: Date;

	if (createdAt instanceof Timestamp) {
		date = createdAt.toDate();
	} else if (createdAt instanceof Date) {
		date = createdAt;
	} else if (typeof createdAt === 'number') {
		date = new Date(createdAt);
	} else {
		throw new Error('Invalid date format');
	}

	const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

	const intervals: Record<string, number> = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	for (const key in intervals) {
		const interval = Math.floor(seconds / intervals[key]);
		if (interval >= 1) {
			return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
		}
	}

	return 'just now';
}
