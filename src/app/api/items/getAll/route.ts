import { NextResponse } from 'next/server';
import { itemsServices } from '@/services/items.services';

export const dynamic = 'force-static';

export async function GET(request: Request) {
	const data = await itemsServices.getAllItems();

	return NextResponse.json({ data });
}
