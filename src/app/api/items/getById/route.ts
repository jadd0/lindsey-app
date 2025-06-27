import { NextRequest, NextResponse } from 'next/server';
import { itemsServices } from '@/services/items.services';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get('id');

	if (!id) {
		return new Response('No id included', { status: 400 });
	}

	const data = await itemsServices.getItem(id);

	if (!data) {
		return new Response(`No item retrieved`, {
			status: 500,
		});
	}

	return NextResponse.json({ data });
}