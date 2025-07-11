export interface Item {
	id?: string; // Only when retrieved from DB
	title: string;
	description: string;
	category: string;
	price: number;
	link: string;
	favourite?: boolean;
	imageUrls?: string[];
	createdAt?: Date;
}

export interface ItemUpdate {
	id?: string; // Only when retrieved from DB
	title?: string;
	description?: string;
	category?: string;
	price?: number;
	link?: string;
	favourite?: boolean;
	imageUrls?: string[];
	createdAt?: Date;
}
