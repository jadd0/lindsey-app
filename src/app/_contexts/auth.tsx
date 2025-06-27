import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from '../_lib/firebase/auth';

interface AuthContextType {
	user: any;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Your authentication logic here
		const unsubscribe = onAuthStateChanged((user) => {
			setUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		user,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
