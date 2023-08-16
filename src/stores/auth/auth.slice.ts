import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { container } from 'tsyringe';
import { IAuthRepository } from '../../repositories/auth.repository.interface';

interface AuthSlice {
	user: any;
}

const initialState: AuthSlice = {
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		addUser(state, action) {},
		getUser(state, action) {
			state.user = action.payload.user;
		},
		countUser(state, action) {},
	},
});

export function addUser(uid: string, name: string, picture: string) {
	return async (dispatch: Dispatch) => {
		console.log('addUser thunk');
		const authRepository = container.resolve<IAuthRepository>('AuthRepository');
		await authRepository.addUser(uid, name, picture);
		// dispatch({
		// 	type: 'todo/insertUser',
		// 	payload: {},
		// });
	};
}

export function getUser(uid: string) {
	return async (dispatch: Dispatch) => {
		console.log('getUser thunk');
		const authRepository = container.resolve<IAuthRepository>('AuthRepository');
		const user = await authRepository.getUser(uid);
		if (user.length !== 1) return;
		dispatch({
			type: 'auth/getUser',
			payload: { user: user[0] },
		});
	};
}

// export function countUsers(uid: string) {
// 	return async (dispatch: Dispatch) => {
// 		console.log('countUser thunk');
// 		const authRepository = container.resolve<IAuthRepository>('AuthRepository');
// 		const a = await authRepository.countUsers(uid);
// 		console.log(a);
// 		return;
// 		// dispatch({
// 		// 	type: 'todo/countUser',
// 		// 	payload: {},
// 		// });
// 	};
// }

export default authSlice.reducer;
