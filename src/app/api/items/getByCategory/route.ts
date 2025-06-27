import { NextRequest, NextResponse } from 'next/server';
import { itemsServices } from '@/services/items.services';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const category = searchParams.get('category');

	if (!category) {
		return new Response('No category included', { status: 400 });
	}

	const data = await itemsServices.getItemsByCategory(category);

	if (!data) {
		return new Response(`No category retrieved`, {
			status: 500,
		});
	}

	return NextResponse.json({ data });
}
