'use client';

import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';
import { useGetFavouriteItems } from './_hooks/items.hooks';
import ItemPreview from './_components/ssr/item/ItemPreview';
import ItemPreviewSkeleton from './_components/ssr/item/ItemPreviewSkeleton';
import { useEffect, useRef, useState } from 'react';
import { Item } from './_shared/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NonScrollScreen, {
	NonScrollScreenHandle,
} from './_components/layout/NonScrollScreen';
import { useLenis } from 'lenis/react';
import UniqueSection from './_components/home/unique/UniqueSection';
import BackgroundSection from './_components/home/background/BackgroundSection';
import QuirkySection from './_components/home/quirkySection/QuirkySection';
import ShopPreviewSection from './_components/home/shopPreview/ShopPreviewSection';

export default function HomePage() {
	return (
		<div className="flex flex-col w-full items-center justify-center">
			{/* Landing page */}
			<div className="flex flex-col min-h-[60vh] items-center justify-center w-full mt-10 px-4">
				<div className="relative w-4/5 sm:w-1/2 md:w-1/3 max-w-xs h-auto aspect-[16/14]">
					<Image
						src="/lindseyShopHangingSign.png"
						alt="Lindsey Shop Logo"
						fill
						className="object-cover rounded"
					/>
				</div>
			</div>

			<UniqueSection />
			<QuirkySection />
			<BackgroundSection />
			<ShopPreviewSection />
		</div>
	);
}
