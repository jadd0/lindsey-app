import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function VideoScrollComponent() {
	const containerRef = useRef(null);
	const videoRef = useRef(null);
	const tlRef = useRef(null);

	// iOS activation helper
	const activateVideoOnIOS = () => {
		const video = videoRef.current;
		if (video) {
			const playPromise = video.play();
			if (playPromise) {
				playPromise
					.then(() => {
						video.pause();
					})
					.catch(() => {
						console.log('iOS video activation failed');
					});
			}
		}
	};

	useGSAP(() => {
		const container = containerRef.current;
		const video = videoRef.current;

		if (!video || !container) return;

		const handleLoadedMetadata = () => {
			if (tlRef.current) {
				tlRef.current.kill();
			}

			// Create the timeline with ScrollTrigger
			tlRef.current = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: 'top top',
					pin: true,
					end: '+=300%',
					scrub: 1,
					onUpdate: (self) => {
						const progress = self.progress;
						// Only update currentTime during the first 66% of the scroll
						if (progress <= 0.66) {
							video.currentTime = (progress / 0.66) * video.duration;
						} else {
							// Keep video at the end frame during zoom
							video.currentTime = video.duration;
						}
					},
				},
			});

			// Video scrubbing animation (first 66% of scroll)
			tlRef.current.fromTo(
				video,
				{ currentTime: 0 },
				{
					currentTime: video.duration,
					duration: 0.66,
					ease: 'none',
				}
			);

			// Zoom effect after video completes (remaining 34% of scroll)
			tlRef.current.to(
				video,
				{
					scale: 12,
					transformOrigin: 'center 5%',
					duration: 0.34,
					ease: 'power2.out',
				},
				0.66
			);
		};

		video.addEventListener('loadedmetadata', handleLoadedMetadata);

		const handleFirstTouch = () => {
			activateVideoOnIOS();
			document.removeEventListener('touchstart', handleFirstTouch);
		};
		document.addEventListener('touchstart', handleFirstTouch);

		video.load();

		return () => {
			if (video) {
				video.removeEventListener('loadedmetadata', handleLoadedMetadata);
			}
			document.removeEventListener('touchstart', handleFirstTouch);
			if (tlRef.current) {
				tlRef.current.kill();
			}
		};
	}, []);

	// Blob loading for better performance
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const timer = setTimeout(() => {
			if (window.fetch && video.src) {
				fetch(video.src)
					.then((response) => response.blob())
					.then((blob) => {
						const blobURL = URL.createObjectURL(blob);
						const currentTime = video.currentTime;
						video.src = blobURL;
						video.currentTime = currentTime + 0.01;
					})
					.catch((error) => {
						console.log('Blob loading failed:', error);
					});
			}
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<div className="scroll-container">
			<div className="spacer" style={{ height: '50vh' }}>

			</div>

			<div ref={containerRef} className="video-container w-1/2">
				<video
					ref={videoRef}
					src="/output.mp4"
					muted
					playsInline
					preload="metadata"
					style={{
						pointerEvents: 'none',
						width: '100%',
						height: 'auto',
					}}
					className="rounded-4xl border-2 border-[#0089ff]"
				/>
			</div>

			<div className="spacer" style={{ height: '200vh' }}>
			</div>
		</div>
	);
}
