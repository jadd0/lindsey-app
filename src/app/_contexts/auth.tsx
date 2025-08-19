'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from '@/firebase/auth';

interface AuthContextType {
	user: any;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: true,
});

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((user: any) => {
			setUser(user);
			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		user,
		isLoading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
