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

export default function HomePage() {
	const {
		data: favouriteItemsResponse,
		isLoading,
		isError,
	} = useGetFavouriteItems();
	const lenis = useLenis();

	const [favouriteItems, setFavouriteItems] = useState<Item[]>([]);

	// Page references for scroll tracking
	const landingPageRef = useRef<NonScrollScreenHandle>(null);

	// track if landing page is in view
	const [landingInView, setLandingInView] = useState(false);

	// Custom hook to lock scroll on app root
	function useAppScrollLock(locked: boolean) {
		useEffect(() => {
			// Target the scroll container, e.g. the app root (min-h-screen div in layout)
			const appRoot = document.getElementById('app-scroll-container');
			if (!appRoot) return;

			if (locked) {
				const previousOverflow = appRoot.style.overflow;
				appRoot.style.overflow = 'hidden';
				return () => {
					appRoot.style.overflow = previousOverflow;
				};
			}
			return () => {
				appRoot.style.overflow = '';
			};
		}, [locked]);
	}

	useEffect(() => {
		if (favouriteItemsResponse?.data) {
			setFavouriteItems(favouriteItemsResponse.data);
		}
	}, [favouriteItemsResponse]);

	// Poll handle for landing page in view
	useEffect(() => {
		const interval = setInterval(() => {
			setLandingInView(!!landingPageRef.current?.inView);
		}, 100);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!lenis) return;
		if (landingInView) {
			lenis.stop();
		} else {
			lenis.start();
		}
		// Cleanup: On unmount, always resume scroll
		return () => lenis?.start();
	}, [landingInView, lenis]);

	// Lock scroll when landing page is in view
	useAppScrollLock(landingInView);

	return (
		<div className="flex flex-col w-full items-center justify-center overflow-x-hidden">
			{/* Landing page */}
			<NonScrollScreen ref={landingPageRef}>
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
			</NonScrollScreen>

			{/* About me section */}
			<Fade triggerOnce>
				<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl px-15 md:px-16 gap-6 my-10 place-items-center">
					{/* Text */}
					<div className="flex flex-col py-6">
						<h2 className="text-3xl sm:text-4xl font-bold">About Me:</h2>
						<p className="mt-4 text-sm md:text-md lg:text-lg">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
							officia laborum natus fugiat vitae praesentium quos, possimus
							molestiae autem quisquam necessitatibus dolorum dicta quis neque
							cumque at soluta. A, saepe? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Tempore, laudantium totam. A
							adipisci aut rerum est. Adipisci aliquid voluptas sequi eum, rerum
							accusantium nihil veniam, commodi maxime inventore quis molestiae?
						</p>
					</div>
					{/* Image */}
					<div className="flex items-center justify-center py-6">
						<Image
							src="/mum.jpg"
							alt="Lindsey Shop Owner"
							width={240}
							height={240}
							className="rounded-full w-40 h-40 sm:w-60 sm:h-60 object-cover"
						/>
					</div>
				</div>
			</Fade>

			{/* Story section */}
			<Fade triggerOnce>
				<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl px-15 md:px-16 gap-6 my-10">
					{/* Text */}
					<div className="flex flex-col justify-center py-6 md:order-2">
						<h2 className="text-3xl sm:text-4xl font-bold">
							All About The Story:
						</h2>
						<p className="mt-4 text-sm md:text-md lg:text-lg">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
							officia laborum natus fugiat vitae praesentium quos, possimus
							molestiae autem quisquam necessitatibus dolorum dicta quis neque
							cumque at soluta. A, saepe? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Tempore, laudantium totam. A
							adipisci aut rerum est. Adipisci aliquid voluptas sequi eum, rerum
							accusantium nihil veniam, commodi maxime inventore quis molestiae?
						</p>
					</div>
					{/* Image */}
					<div className="flex items-center justify-center py-6 md:order-1">
						<Image
							src="/hangingTree.png"
							alt="Bouganvillea Tree with Hanging Decoration"
							width={280}
							height={280}
							className="rounded-full w-52 h-52 sm:w-80 sm:h-80 object-cover"
						/>
					</div>
				</div>
			</Fade>

			{/* Featured products */}
			<div className="flex flex-col w-full max-w-6xl mx-auto px-15 md:px-16 my-10">
				{/* Text */}
				<div className="flex flex-col py-6">
					<h2 className="text-3xl sm:text-4xl font-bold">My Favourites:</h2>
					<p className="mt-4 text-sm md:text-md lg:text-lg">
						These are my current favourite items, which I have handpicked (and
						often wear myself 😉)
					</p>
				</div>
				{/* Products */}
				<div className="w-full grid gap-6 grid-cols-1 md:grid-cols-3">
					<Fade cascade damping={0.1} triggerOnce>
						{!isLoading &&
							!isError &&
							favouriteItems.map((item, index) => (
								<ItemPreview item={item} key={index} clickable={false} />
							))}
						{isLoading &&
							Array.from({ length: 3 }).map((_, index) => (
								<ItemPreviewSkeleton key={index} />
							))}
					</Fade>
				</div>
				<div className="w-full flex justify-center my-6">
					<Link href={'/items'}>
						<div className="flex flex-row gap-2 items-center">
							<h1 className="font-bold text-lg underline hover:text-blue-600 transition-colors">
								View more items
							</h1>
							<ArrowRight />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
