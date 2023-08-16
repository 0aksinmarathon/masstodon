import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../stores/auth/auth.slice';
import { AppDispatch } from '../../stores/store';
import { fireauth } from '../firebase/firebase';

export function AuthProvider({ children }: { children: ReactNode }) {
	// const [user, setUser] = useState('');
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		const unsubscribed = fireauth.onAuthStateChanged(async (user) => {
			if (user) {
				await dispatch(getUser(user.uid));
			} else {
				navigate('/');
			}
			setLoading(false);
		});
		return () => {
			unsubscribed();
		};
	}, []);

	return <>{!loading && children}</>;
}
