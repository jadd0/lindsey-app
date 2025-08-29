import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function VideoScrollComponent() {
	const containerRef = useRef(null);
	const videoRef = useRef(null);

	useGSAP(() => {
		const container = containerRef.current;
		const video = videoRef.current;

		const handleLoadedMetadata = () => {
			// Ensure video is ready for scrubbing
			video.currentTime = 0;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: 'top 150vh',
					pin: true,
					end: '+=200%',
					scrub: 10, // Increased smoothing
					onUpdate: (self) => {
						const targetTime = self.progress * video.duration;
						if (Math.abs(video.currentTime - targetTime) > 0.1) {
							video.currentTime = targetTime;
						}
					},
				},
			});
		};

		if (video) {
			video.addEventListener('loadedmetadata', handleLoadedMetadata);
			// Preload video
			video.load();
		}

		return () => {
			if (video) {
				video.removeEventListener('loadedmetadata', handleLoadedMetadata);
			}
		};
	}, []);

	return (
		<div className="scroll-container">
			<div className="spacer" style={{ height: '50vh' }}>
				<h2>Scroll down to see video effect</h2>
			</div>

			<div ref={containerRef} className="video-container w-1/2">
				<video
					ref={videoRef}
					src="/balconyOpeningNew.mp4"
					muted
					playsInline
					preload="metadata"
					style={{ pointerEvents: 'none' }} // Prevent video controls interference
				/>
			</div>

			<div className="spacer" style={{ height: '100vh' }}>
				<h2>Content after video</h2>
			</div>
		</div>
	);
}
