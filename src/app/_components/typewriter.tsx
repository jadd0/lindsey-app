import { useState, useEffect, useRef, useImperativeHandle } from 'react';

export default function Typewriter({
	text,
	hasFinished,
}: {
	text: string;
	hasFinished: () => void;
}) {
	const [displayedText, setDisplayedText] = useState('');
	const [inView, setInView] = useState(false);
	const [hasStarted, setHasStarted] = useState(false);

	const divRef = useRef<HTMLDivElement>(null);

	const indexRef = useRef(0);

	useEffect(() => {
		let idx = 0;
		const interval = setInterval(() => {
			if (!inView || hasStarted) return;
			setHasStarted(true);
			setDisplayedText(text.substring(0, idx + 1));
			idx += 1;
			if (idx >= text.length) {
				hasFinished();
				clearInterval(interval);
			}
		}, 30);
		return () => {
			clearInterval(interval);
		};
	}, [inView, text]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ threshold: 0 }
		);
		if (divRef.current) observer.observe(divRef.current);
		if (inView) observer.disconnect();
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={divRef} className="text-xl font-semkibold">
			<span>{displayedText}</span>
		</div>
	);
}
