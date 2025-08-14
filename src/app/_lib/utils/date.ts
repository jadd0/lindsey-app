import { Timestamp } from 'firebase/firestore';

export function timeAgo(createdAt: Timestamp | Date | number): string {
	let date: Date;

	console.log(typeof createdAt);

	if (createdAt instanceof Timestamp) {
		date = createdAt.toDate();
	} else if (createdAt instanceof Date) {
		date = createdAt;
	} else if (typeof createdAt === 'number' || typeof createdAt === 'string') {
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

export function serialiseItem(item: any) {
	let createdAt: string | null = null;

	if (item.createdAt instanceof Date) {
		createdAt = item.createdAt.toISOString();
	} else if (
		item.createdAt &&
		typeof item.createdAt.seconds === 'number' &&
		typeof item.createdAt.nanoseconds === 'number'
	) {
		createdAt = new Date(
			item.createdAt.seconds * 1000 +
				Math.floor(item.createdAt.nanoseconds / 1e6)
		).toISOString();
	} else if (typeof item.createdAt === 'string') {
		createdAt = item.createdAt;
	}

	return { ...item, createdAt };
}
