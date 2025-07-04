export interface Item {
  id?: string; // Only when retrieved from DB
  title: string;
  description: string;
  category: string; // TODO: replace with enum of item types ie: bag, scarf
  price: number;
  link: string;
  imageUrls?: string[];
  createdAt?: Date;
}

export interface ItemUpdate {
  id?: string; // Only when retrieved from DB
  title?: string;
  description?: string;
  category?: string; // TODO: replace with enum of item types ie: bag, scarf
  price?: number;
  link?: string;
  imageUrls?: string[];
  createdAt?: Date;
}