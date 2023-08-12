import BlockIcon from '@mui/icons-material/Block';

const NotFound = () => {
	return (
		<div className='flex justify-center items-center text-black px-20 w-full'>
			<BlockIcon className='mr-2' style={{ fontSize: 40 }} />
			<span className='font-bold text-gray-600'>Page Not Found!</span>
		</div>
	);
};

export default NotFound;
