"use client"

import { toast } from 'sonner';
import { auth, googleProvider } from '../firebase/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

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
      throw new Error("Unauthorised email address")
    }

		console.log('User signed in:', user);
		return user;
	} catch (error) {
    toast.error(error!.toString())
	}
};

export const signOutUser = async () => {
	try {
		await signOut(auth);
		console.log('User signed out');
	} catch (error) {
		console.error('Error signing out:', error);
		throw error;
	}
};
