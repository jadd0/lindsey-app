import { NextResponse } from 'next/server';
import { itemsServices } from '@/services/items.services';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-static';

export async function DELETE(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get('id');

	if (!id) {
		return new Response('No id included', { status: 400 });
	}

	const data = await itemsServices.deleteItemById(id);

	if (!data) {
		return new Response(`Error occured whilst trying to delete item`, {
			status: 500,
		});
	}

	return NextResponse.json({ data });
}
