import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlandDefinition from './BlandDefintion';

gsap.registerPlugin(ScrollTrigger);

export default function BlandSection() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const horizontalRef = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const horizontal = horizontalRef.current;
		if (!container || !horizontal) return;

		const getScrollAmount = () => {
			const scrollWidth = horizontal.scrollWidth;
			const windowWidth = window.innerWidth;
			return scrollWidth - windowWidth;
		};
		
		let ctx = gsap.context(() => {
			// Calculate the distance the horizontal content needs to scroll

			// Set up the horizontal scroll animation
			const scrollAmount = getScrollAmount();

			gsap.to(horizontal, {
				x: () => -getScrollAmount(),
				ease: 'none',
				scrollTrigger: {
					trigger: container,
					start: 'top top',
					end: () => `+=${getScrollAmount()}`, // This is the key fix
					pin: true,
					scrub: true,
					anticipatePin: 1,
					invalidateOnRefresh: true, // Important for recalculating on resize
					onRefresh: () => {
						// Update container height to match scroll distance
						const newScrollAmount = getScrollAmount();
						container.style.height = `${
							newScrollAmount + window.innerHeight
						}px`;
					},
				},
			});

			// Set initial height
			container.style.height = `${scrollAmount + window.innerHeight}px`;
		}, container); // Scope to container

		// Handle resize
		const handleResize = () => {
			ctx.revert(); // Clean up
			// Recreate the context with new calculations
			ctx = gsap.context(() => {
				const scrollAmount = getScrollAmount();

				gsap.to(horizontal, {
					x: () => -getScrollAmount(),
					ease: 'none',
					scrollTrigger: {
						trigger: container,
						start: 'top top',
						end: () => `+=${getScrollAmount()}`,
						pin: true,
						scrub: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					},
				});

				container.style.height = `${scrollAmount + window.innerHeight}px`;
			}, container);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			ctx.revert(); // Clean up GSAP context
		};
	}, []);

	const synonyms = [
		'boring',
		'dull',
		'uninteresting',
		'tedious',
		'monotonous',
		'insipid',
		'mundane',
		'drab',
	];

	return (
		<section
			ref={containerRef}
			style={{
				width: '100vw',
				overflow: 'hidden',
				// Height will be set dynamically via JavaScript
			}}
		>
			{/* Sticky header */}
			<div
				style={{
					position: 'sticky',
					top: 0,
					width: '100vw',
					zIndex: 10,
					color: '#fff',
					padding: '1.5rem',
					fontSize: '2rem',
					textAlign: 'center',
				}}
			>
				<BlandDefinition />
			</div>

			{/* Horizontal scroll content */}
			<div
				ref={horizontalRef}
				style={{
					display: 'flex',
					position: 'absolute',
					bottom: 100,
					left: 0,
				}}
			>
				{synonyms.map((word, index) => (
					<div
						key={index}
						style={{
							width: 'auto',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '4rem',
							fontWeight: 'bold',
							flexShrink: 0,
							paddingLeft: '2rem',
						}}
					>
						{word}
					</div>
				))}
			</div>
		</section>
	);
}
