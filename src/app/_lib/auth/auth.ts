'use client';

import { toast } from 'sonner';
import { auth, googleProvider } from '../firebase/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import nookies from 'nookies';

const allowedEmails = [
	process.env.NEXT_PUBLIC_LINDSEY_ALLOWED_EMAIL,
	process.env.NEXT_PUBLIC_JADD_ALLOWED_EMAIL,
];

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user;

		if (!allowedEmails.includes(user.email!)) {
			await signOutUser();
			throw new Error('Unauthorised email address');
		}

		// Get ID token from Firebase
		const token = await user.getIdToken();

		nookies.set(null, 'token', token, {
			path: '/',
			maxAge: 100 * 365 * 24 * 60 * 60, // 100 years in seconds
			// TODO: for production: secure: true, sameSite: 'lax'
		});

		console.log('User signed in:', user);
		return user;
	} catch (error) {
		toast.error(error!.toString());
	}
};

export const signOutUser = async () => {
	try {
		await signOut(auth);
		// Remove the token cookie
		nookies.destroy(null, 'token');
		console.log('User signed out');
	} catch (error) {
		console.error('Error signing out:', error);
		throw error;
	}
};
