import React, { useEffect, useState } from 'react';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const SideBar = () => {
	// const a = useSelector((store: RootState) => store.todo);
	// const dispatch = useDispatch<AppDispatch>();
	const [isHidden, setIsHidden] = useState(true);
	return (
		<div className='h-[800px] min-w-[200px] bg-sky-950 drop-shadow-hard2 py-4 px-4'>
			<div className='rounded-full bg-white w-5 h-5 flex items-center justify-center drop-shadow-hard2 absolute left-[188px] cursor-pointer'>
				<KeyboardBackspaceIcon color='primary' fontSize='small' />
			</div>
		</div>
	);
};

export default SideBar;
