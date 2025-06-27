import {
	onAuthStateChanged as _onAuthStateChanged,
	onIdTokenChanged as _onIdTokenChanged,
	signInWithPopup,
	GoogleAuthProvider,
	signOut as _signOut,
} from 'firebase/auth';
import { auth } from './firebase';

export function onAuthStateChanged(cb: any) {
	return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: any) {
	return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	try {
		await signInWithPopup(auth, provider);
	} catch (error) {
		console.error('Error signing in with Google', error);
	}
}

export async function signOut() {
	try {
		return auth.signOut();
	} catch (error) {
		console.error('Error signing out with Google', error);
	}
}
