import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';

const Header = () => {
	const a = useSelector((store: RootState) => store.todo);
	const dispatch = useDispatch<AppDispatch>();
	return (
		<div className='h-[50px] bg-sky-800 flex items-center px-4 justify-between drop-shadow-hard2 w-full'>
			<div className='font-[1000]'>MassToDon</div>
			<div className='flex items-center gap-x-8'>
				<div className='rounded-full bg-white w-8 h-8 flex items-center justify-center '>
					<NotificationsNoneIcon color='primary' />
				</div>
				<div className='rounded-full w-10 h-10 flex items-center'>
					<img
						src='https://picsum.photos/200/300'
						alt=''
						className='w-8 h-8 rounded-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
