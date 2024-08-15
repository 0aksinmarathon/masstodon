import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../stores/store';
import { setMyTodos } from '../stores/todos/todo.slice';
import './List.scss';

import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	addFollow,
	deleteFollow,
	getFollowAndFollowerCount,
	getHomeUser,
	getIsUserFollowed,
} from '../stores/users/user.slice';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

ChartJS.register(ArcElement, Tooltip, Legend);

// const options: ChartOptions<'pie'> = {
// 	// maintainAspectRatio: false,
// 	// responsive: false,
// };
const Home = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { userId } = useParams();
	const user = userId
		? useSelector((store: RootState) => store.user.user)
		: useSelector((store: RootState) => store.auth.user);
	const authUser = useSelector((store: RootState) => store.auth.user);
	const navigate = useNavigate();
	if (authUser && String(authUser.id) === userId) {
		navigate('/home');
	}
	const isUserFollowed = useSelector(
		(store: RootState) => store.user.isUserFollowed
	);
	useEffect(() => {}, []);

	useEffect(() => {
		console.log(userId);
		if (userId) {
			dispatch(getHomeUser(userId));
		}
		if (authUser && user) {
			dispatch(getIsUserFollowed(authUser.id, user.id));
		}
	}, []);

	useEffect(() => {
		if (user) {
			dispatch(setMyTodos(user.id));
			dispatch(getFollowAndFollowerCount(user.id));
		}
	}, [user]);
	const myTodoCounts = useSelector((store: RootState) => {
		return Object.values(store.todo.myTodos).map((todos) => todos.length);
	});

	const followCount = useSelector((store: RootState) => store.user.followCount);
	const followerCount = useSelector(
		(store: RootState) => store.user.followerCount
	);
	console.log(followCount);

	const onClickFollow = () => {
		dispatch(addFollow(authUser.id, user.id));
	};

	const onClickUnfollow = () => {
		dispatch(deleteFollow(authUser.id, user.id));
	};

	const data: ChartData<'pie'> = {
		labels: ['Planning', 'InProgress', 'Finished', 'Archived'],
		datasets: [
			{
				label: 'Status',
				data: myTodoCounts,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 2,
			},
		],
	};

	return (
		<>
			<div className='mt-5 mx-4 bg-gray-400 p-10 w-2/4 h-full rounded-lg drop-shadow-hard'>
				<Pie data={data} width={100} height={100} />
			</div>
			{user && (
				<div className='mt-5 mx-4 bg-gray-400 p-10 w-2/4 h-full rounded-lg drop-shadow-hard'>
					<img
						src={user.picture}
						alt=''
						className='w-[64px] h-[64px] rounded-full mx-auto'
					/>
					<div className='text-center mt-1'>{user.name}</div>
					<Link to={userId ? '/follow/' + userId : '/follow'}>
						<div className='mt-6 rounded-md drop-shadow-hard1 flex justify-center items-center gap-x-10  bg-gray-500 cursor-pointer mx-auto px-4'>
							<div className=''>
								<span className='mr-2'>Follows:</span>
								<span> {followCount}</span>
							</div>
							<div className=''>
								<span className='mr-2'>Followers:</span>
								<span> {followerCount}</span>
							</div>
						</div>
					</Link>
					<div className='flex gap-x-6 justify-center'>
						<Link to={userId ? '/' + userId : '/'} className='w-2/4'>
							<div className='flex justify-center items-center mt-4 rounded-md drop-shadow-hard1  bg-gray-500 cursor-pointer mx-auto px-4'>
								<ViewKanbanIcon />
								<span> Board</span>
							</div>
						</Link>
						<Link to={userId ? '/list/' + userId : '/list'} className='w-2/4'>
							<div className='  flex justify-center items-center mt-4 rounded-md drop-shadow-hard1  bg-gray-500 cursor-pointer mx-auto px-4 '>
								<ListAltIcon />
								<span> List</span>
							</div>
						</Link>
					</div>
					{authUser && userId ? (
						isUserFollowed ? (
							<div
								className='mt-6 text-xs rounded-md drop-shadow-hard1 flex justify-center items-center gap-x-10 border bg-gray-500 cursor-pointer mx-auto px-4 w-fit'
								onClick={onClickUnfollow}
							>
								<div className=''>Unfollow</div>
							</div>
						) : (
							<div
								className='mt-6 text-xs rounded-md drop-shadow-hard1 flex justify-center items-center gap-x-10 border bg-gray-500 cursor-pointer mx-auto px-4 w-fit'
								onClick={onClickFollow}
							>
								<div className=''>Follow</div>
							</div>
						)
					) : null}
				</div>
			)}
		</>
	);
};

export default Home;
