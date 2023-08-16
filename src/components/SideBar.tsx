import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../stores/store';
const SideBar = () => {
	const [isHidden, setIsHidden] = useState(false);
	const user = useSelector((store: RootState) => store.auth.user);
	const menu = [
		{
			icon: <HomeIcon />,
			name: 'Home',
			path: 'home',
			loginRequired: true,
		},
		{
			icon: <ViewKanbanIcon />,
			name: 'Board',
			path: '',
			loginRequired: false,
		},
		{
			icon: <ListAltIcon />,
			name: 'List',
			path: 'list',
			loginRequired: true,
		},
	];
	return (
		<div
			className={`h-screen min-w-[200px] bg-sky-950 drop-shadow-hard2 py-4 px-4 ${
				!isHidden ? 'min-w-[200px]' : 'min-w-[60px]'
			}`}
		>
			{!isHidden ? (
				<div className='rounded-full bg-white w-5 h-5 flex items-center justify-center drop-shadow-hard2 absolute left-[188px] cursor-pointer'>
					<KeyboardArrowLeftIcon
						color='primary'
						fontSize='small'
						onClick={() => setIsHidden(!isHidden)}
					/>
				</div>
			) : (
				<div className='rounded-full bg-white w-5 h-5 flex items-center justify-center drop-shadow-hard2 absolute left-[48px] cursor-pointer'>
					<KeyboardArrowRightIcon
						color='primary'
						fontSize='small'
						onClick={() => setIsHidden(!isHidden)}
					/>
				</div>
			)}
			<div className='text-base gap-y-4 flex flex-col'>
				{menu.map(({ icon, name, path, loginRequired }) => {
					return !isHidden ? (
						<Link
							to={path}
							key={name}
							onClick={(e) => {
								if (loginRequired && !user) {
									e.preventDefault();
								}
							}}
							className={`cursor-pointer ${
								loginRequired && !user && 'opacity-50 cursor-default'
							}`}
						>
							<div className=''>
								{icon}
								<span className='ml-2'>{name}</span>
							</div>
						</Link>
					) : (
						<Link to={path} key={name}>
							<div className='cursor-pointer'>{icon}</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default SideBar;
