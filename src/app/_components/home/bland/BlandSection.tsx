import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlandDefinition from './BlandDefintion';
import { Fade } from 'react-awesome-reveal';

gsap.registerPlugin(ScrollTrigger);

export default function BlandSection() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const horizontalRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(window.innerHeight);

	console.log('height', height);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const horizontal = horizontalRef.current;
		if (!container || !horizontal) return;

		const updateHeight = () => {
			console.log('horizontal');
			const totalScroll = horizontal.scrollWidth - window.innerWidth;
			setHeight(totalScroll + window.innerHeight);

			console.log(height);

			// kill/re-init ScrollTrigger so it's in sync on resize
			ScrollTrigger.refresh();
		};

		// Initial run
		updateHeight();

		// GSAP horizontal animation
		gsap.to(horizontal, {
			x: () => -(horizontal.scrollWidth - window.innerWidth + 50),
			ease: 'none',
			scrollTrigger: {
				trigger: container,
				start: 'top top',
				end: () => `+=${horizontal.scrollWidth - window.innerWidth + 50}`,
				pin: true,
				scrub: true,
				anticipatePin: 1,
			},
		});

		// Recalculate on resize
		// window.addEventListener('resize', updateHeight);

		return () => {
			window.removeEventListener('resize', updateHeight);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	const synonyms = [
		'distinctive',
		'interesting',
		'special',
		'quirky',
		'eccentric',
		'rare',
		'unrepeatable'
	];

	return (
		<section
			ref={containerRef}
			style={{
				width: '100vw',
				overflow: 'hidden',
				minHeight: `${height}px`,
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
			<Fade cascade triggerOnce delay={3300}>
				<div
					ref={horizontalRef}
					style={{
						display: 'flex',
						position: 'relative',
						bottom: 0,
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
								color: `${word === 'quirky' ? '#ff568c' : ''}`, 
								flexShrink: 0, 
								paddingLeft: `${index === 0 ? '5rem' : '2rem'}`,
							}}
						>
							{word}
						</div>
					))}
				</div>
			</Fade>
		</section>
	);
}
