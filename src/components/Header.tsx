import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSelector } from 'react-redux';
import { Login } from '../common/firebase/Login';
import { RootState } from '../stores/store';

const Header = () => {
	const user = useSelector((store: RootState) => store.auth.user);
	return (
		<div className='h-[50px] bg-sky-800 flex items-center px-4 justify-between drop-shadow-hard2 w-full'>
			<div className='font-[1000]'>MassToDon</div>
			<div className='flex items-center gap-x-8'>
				<div className='rounded-full bg-white w-8 h-8 flex items-center justify-center '>
					<NotificationsNoneIcon color='primary' />
				</div>
				{user ? (
					<div className='rounded-full w-10 h-10 flex items-center'>
						<img src={user.picture} alt='' className='w-8 h-8 rounded-full' />
					</div>
				) : (
					<Login />
				)}
			</div>
		</div>
	);
};

export default Header;
