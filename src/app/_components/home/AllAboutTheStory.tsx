'use client';

import { useEffect, useState, useRef } from 'react';

export default function AllAboutTheStory() {
	const [visibleCount, setVisibleCount] = useState(1);
	const [isSticky, setIsSticky] = useState(true);
  const [scrollYInContainer, setScrollYInContainer] = useState(0);

	const sectionRef = useRef(null);
  let rect;

	const list = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  useEffect(() => {
    if (!sectionRef) return;
    rect = sectionRef.current.getBoundingClientRect();
  }, [sectionRef])

	useEffect(() => {
		function handleScroll() {
			if (!sectionRef.current) return;

			// Calculate how far the viewport has scrolled past the top of your section
			const scrollPastSection = window.scrollY - rect.top ;


			const newCount = Math.min(
				Math.ceil(scrollPastSection / 200) + 1,
				list.length
			);
			setVisibleCount(newCount);

			// Unstick after all items are revealed
			if (newCount >= list.length) setIsSticky(false);
		}

    
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [list.length]);

	return (
		<div
			ref={sectionRef}
			className={`top-0 ${isSticky ? 'sticky' : ''} bg-white`}
		>
			<div className="w-screen flex flex-row">
				<aside className="sticky top-0 h-screen flex items-center justify-center bg-blue-100 text-blue-900 w-40 min-w-[10rem] shadow-md">
					Sticky Sidebar
				</aside>
				<ul className="flex-1 p-8">
					{list.slice(0, visibleCount).map((item, i) => (
						<li key={i} className="mb-6 py-4 px-8 bg-blue-50 rounded shadow">
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
