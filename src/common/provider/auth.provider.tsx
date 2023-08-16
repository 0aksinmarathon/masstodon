import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../stores/auth/auth.slice';
import { AppDispatch } from '../../stores/store';
import { fireauth } from '../firebase/firebase';

export function AuthProvider({ children }: { children: ReactNode }) {
	// const [user, setUser] = useState('');
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		const unsubscribed = fireauth.onAuthStateChanged(async (user) => {
			if (user) {
				await dispatch(getUser(user.uid));
			}
			setLoading(false);
		});
		return () => {
			unsubscribed();
		};
	}, []);

	return <>{!loading && children}</>;
}
