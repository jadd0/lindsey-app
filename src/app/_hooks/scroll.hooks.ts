"use client"

import { useEffect } from "react";

function useScrollLock(locked: boolean, selector = '#app-scroll-container') {
	useEffect(() => {
		const container = document.querySelector(selector);
		if (!container) return;

		if (locked) {
			const original = container.style.overflow;
			container.style.overflow = 'hidden';
			return () => {
				container.style.overflow = original;
			};
		}
		// Clean up if unlocked
		return () => {
			container.style.overflow = '';
		};
	}, [locked, selector]);
}
