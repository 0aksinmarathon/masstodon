import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { container } from 'tsyringe';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { IUserRepository } from '../../repositories/user.repository.interface';

export interface FollowUser {
	id: number;
	name: string;
	picture: string;
}

export type Status = 'planning' | 'workInProgress' | 'finished' | 'archived';

interface TodoSlice {
	user: FollowUser | null;
	isUserFollowed: boolean;
	followCount: number;
	followerCount: number;
	follows: FollowUser[];
	followers: FollowUser[];
}

const initialState: TodoSlice = {
	user: null,
	isUserFollowed: false,
	followCount: 0,
	followerCount: 0,
	follows: [],
	followers: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getHomeUser(state, action) {
			console.log('getHOmeUser', action.payload);
			state.user = action.payload.user;
		},
		getFollowsAndFollowers(state, action) {
			const { follows, followers } = action.payload;
			state.follows = follows;
			state.followers = followers;
		},

		getFollowAndFollowerCount(state, action) {
			const { followCount, followerCount } = action.payload;
			state.followCount = followCount;
			state.followerCount = followerCount;
		},
		getIsUserFollowed(state, action) {
			const { isUserFollowed } = action.payload;
			state.isUserFollowed = isUserFollowed;
		},
		addFollow(state, action) {
			state.isUserFollowed = true;
			state.followerCount += 1;
		},
		deleteFollow(state, action) {
			state.isUserFollowed = false;
			state.followerCount -= 1;
		},
	},
});

export function getHomeUser(uid: string) {
	return async (dispatch: Dispatch) => {
		console.log('getHomeUser thunk');
		const userRepository = container.resolve<IUserRepository>('UserRepository');
		const user = await userRepository.getUser(uid);
		if (user.length !== 1) return;
		dispatch({
			type: 'user/getHomeUser',
			payload: { user: user[0] },
		});
	};
}

export function addFollow(followerId: number, followedId: number) {
	return async (dispatch: Dispatch) => {
		console.log('addFollow thunk');
		const userRepository = container.resolve<IUserRepository>('UserRepository');
		await userRepository.addFollow(followerId, followedId);
		dispatch({
			type: 'user/addFollow',
			payload: {
				followerId,
				followedId,
			},
		});
	};
}

export function deleteFollow(followerId: number, followedId: number) {
	return async (dispatch: Dispatch) => {
		console.log('deleteFollow thunk');
		const userRepository = container.resolve<IUserRepository>('UserRepository');
		await userRepository.deleteFollow(followerId, followedId);
		dispatch({
			type: 'user/deleteFollow',
			payload: {
				followerId,
				followedId,
			},
		});
	};
}

export function getFollowAndFollowerCount(userId: number) {
	return async (dispatch: Dispatch) => {
		console.log('getFollowAndFollowerCount thunk');
		const userRepository = container.resolve<IUserRepository>('UserRepository');
		console.log(userId);
		const [followCount, followerCount] =
			await userRepository.getFollowAndFollowerCount(userId);
		console.log(followCount);
		console.log(followerCount);
		dispatch({
			type: 'user/getFollowAndFollowerCount',
			payload: {
				followCount,
				followerCount,
			},
		});
	};
}

export function getFollowsAndFollowers(userId: number) {
	return async (dispatch: Dispatch) => {
		console.log('getFollowsAndFollowers thunk');
		const userRepository = container.resolve<IUserRepository>('UserRepository');
		const [follows, followers] = await userRepository.getFollowsAndFollowers(
			userId
		);
		dispatch({
			type: 'user/getFollowsAndFollowers',
			payload: {
				follows,
				followers,
			},
		});
	};
}

export function getIsUserFollowed(followerId: number, followedId: number) {
	return async (dispatch: Dispatch) => {
		console.log('getIsUserFollowed thunk');
		const userRepository = container.resolve<IUserRepository>('UserRepository');
		const isUserFollowed = await userRepository.getIsUserFollowed(
			followerId,
			followedId
		);
		dispatch({
			type: 'todo/getIsUserFollowed',
			payload: {
				isUserFollowed,
			},
		});
	};
}

export default userSlice.reducer;
