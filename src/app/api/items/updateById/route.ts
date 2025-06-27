import { NextResponse } from 'next/server';
import { itemsServices } from '@/services/items.services';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-static';

export async function PUT(request: NextRequest) {
	const formData = await request.formData();
}
