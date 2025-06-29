"use client"

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/firebase';
import { signInWithGoogle, signOutUser } from '@/lib/auth/auth';

export default function AuthComponent() {
	const [user, loading, error] = useAuthState(auth);

	const handleSignIn = async () => {
		try {
			await signInWithGoogle();
		} catch (error) {
			console.error('Sign-in failed:', error);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOutUser();
		} catch (error) {
			console.error('Sign-out failed:', error);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			{user ? (
				<div>
					<h1>Welcome, {user.displayName}!</h1>
					<img src={user.photoURL || ''} alt="Profile" />
					<p>Email: {user.email}</p>
					<button onClick={handleSignOut}>Sign Out</button>
				</div>
			) : (
				<button onClick={handleSignIn}>Sign In with Google</button>
			)}
		</div>
	);
}

