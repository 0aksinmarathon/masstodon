import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../stores/store';
import { FollowUser, setMyTodos } from '../stores/todos/todo.slice';
import './List.scss';

import { Link, useParams, useNavigate } from 'react-router-dom';
import {
	getFollowsAndFollowers,
	getHomeUser,
	getIsUserFollowed,
} from '../stores/users/user.slice';

const Follow = () => {
	const { userId } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const user = userId
		? useSelector((store: RootState) => store.user.user)
		: useSelector((store: RootState) => store.auth.user);
	const authUser = useSelector((store: RootState) => store.auth.user);
	const navigate = useNavigate();
	if (authUser && String(authUser.id) === userId) {
		navigate('/follow');
	}

	useEffect(() => {
		if (userId) {
			dispatch(getHomeUser(userId));
		}
	}, []);
	useEffect(() => {
		if (authUser && user) {
			dispatch(getIsUserFollowed(authUser.id, user.id));
		}
		if (user) {
			dispatch(getFollowsAndFollowers(user.id));
			dispatch(setMyTodos(user.id));
		}
	}, [user]);

	const [mode, setMode] = useState(user ? 'follows' : 'followers');
	const filterUsers = (users: FollowUser[]): FollowUser[] => {
		if (userNameFilter) {
			users = users.filter(({ name }) => String(name).includes(userNameFilter));
		}

		return users;
	};
	const users =
		mode === 'follows'
			? useSelector((store: RootState) => store.user.follows)
			: useSelector((store: RootState) => store.user.followers);

	const [userNameFilter, setUserNameFilter] = useState('');

	return (
		<div className='w-full '>
			<div className='bg-slate-700 py-2 px-10 flex gap-x-10 font-bold'>
				<div
					className={`cursor-pointer ${
						mode === 'follows' ? 'border-b-4' : ''
					} ${!user && 'opacity-50 cursor-default'} `}
					onClick={() => user && setMode('follows')}
				>
					Follows
				</div>
				<div
					className={`${
						mode === 'followers' ? 'border-b-4' : ''
					} cursor-pointer`}
					onClick={() => setMode('followers')}
				>
					Followers
				</div>
			</div>
			<div className='bg-slate-600 py-2 px-10 flex font-thin text-sm'>
				<div className='mr-4'>User Name: </div>
				<input
					className='mr-10 text-gray-600 px-1'
					onChange={(e) => setUserNameFilter(e.target.value)}
				></input>
			</div>

			<div className='mt-5 mx-4 bg-gray-400 p-5 w-4/5 h-fit rounded-lg drop-shadow-hard1'>
				{filterUsers(users).length !== 0 ? (
					filterUsers(users).map((user, index) => (
						<Link to={'/home/' + user.id}>
							<div
								key={index}
								className='rounded-md p-2 flex gap-x-4 drop-shadow-hard1 bg-gray-500 mb-2 w-4/5 text-base justify-center items-center'
							>
								<img
									src={user.picture}
									alt=''
									className='w-8 h-8 mr-2 rounded-full'
								/>
								{user.name}
							</div>
						</Link>
					))
				) : (
					<span className='text-sm'>"No result hit..."</span>
				)}
			</div>
		</div>
	);
};

export default Follow;
