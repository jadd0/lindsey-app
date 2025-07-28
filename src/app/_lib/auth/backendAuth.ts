'use server';

import admin from '../firebase/admin';
import { cookies } from 'next/headers';

export async function authHandlerReq(req: any, res: any) {
	const idToken = req.headers.authorization?.split('Bearer ')[1];
	if (!idToken) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		// User is authenticated
		return res.status(200).json({ uid: decodedToken.uid });
	} catch (error) {
		return res.status(401).json({ error: 'Invalid token' });
	}
}
/**
 * Checks for a Firebase ID token in cookies and verifies it with Firebase Admin.
 * Returns decoded token (or UID) if authenticated, otherwise null.
 */
export async function requireAuth() {
	const cookieStore = await cookies(); 
	const token = cookieStore.get('coonect.sid')?.value;

	if (!token) return null;
	try {
		const decoded = await admin.auth().verifyIdToken(token);
		return decoded;
	} catch (e) {
		return null;
	}
}
