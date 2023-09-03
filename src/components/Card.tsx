import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Circle } from 'rc-progress';
import React from 'react';
import { Todo } from '../stores/todos/todo.slice';
import './Card.scss';

import { getColor } from '../common/util/get-color';
import { Link } from 'react-router-dom';

const Card = (props: { todo: Todo }) => {
	const { id, title, description, progress, tags, comments, likes, user } =
		props.todo;
	const [isHidden, setIsHidden] = React.useState(true);
	return (
		<div className='drop-shadow-hard1 bg-gray-500'>
			<div className='rounded-t-md  px-4 pt-2 pb-2'>
				<div className='flex justify-between'>
					<div className='break-words line-clamp-2 text-xs mb-2 border w-[100px] flex justify-center items-center'>
						{id}
					</div>
					<div className='w-[30px] opacity-75'>
						<Circle
							percent={progress}
							strokeWidth={20}
							steps={{
								count: 20,
								space: 5,
							}}
							strokeColor={getColor(progress)}
						/>
					</div>
				</div>
				<div className='font-semibold break-words line-clamp-2 text-lg'>
					{title}
				</div>
				{isHidden ? (
					<Link to={'/home/' + user.id}>
						<div className='font-semibold break-words line-clamp-2 text-xs flex items-center cursor-pointer'>
							<img
								src={user.picture}
								alt=''
								className='w-5 h-5 mr-2 rounded-full'
							/>
							{user.name}
						</div>
					</Link>
				) : null}

				<div
					className='cursor-pointer rounded-full bg-white w-4 h-4 flex items-center justify-center drop-shadow-hard1 absolute right-2.5 -bottom-2 '
					onClick={(e) => {
						setIsHidden(!isHidden);
						e.stopPropagation();
					}}
				>
					{isHidden ? (
						<ArrowDropDownIcon color='primary' />
					) : (
						<ArrowDropUpIcon color='primary' />
					)}
				</div>
			</div>
			{!isHidden ? (
				<>
					<hr className='ml-4 w-[30%] border-2' />
					<div className='rounded-t-md px-4 pt-2 pb-2'>
						<div className='break-words line-clamp-3 text-sm'>
							{description}
						</div>
					</div>
					<hr className='' />
					<div className='px-4 py-2 '>
						<div className='flex flex-wrap gap-x-2 gap-y-1 justify-center'>
							{tags.length !== 0 ? (
								tags.map(({ name }) => {
									return (
										<>
											<div className='rounded-md px-2 bg-gray-800 text-xs h-5 pt-0.5'>
												{name}
											</div>
										</>
									);
								})
							) : (
								<div className='text-xs'>No tag is set on this todo...</div>
							)}
						</div>
					</div>
					<hr className='' />
					<div className='px-4  rounded-b-md flex text-sm'>
						<div className='w-2/4 border-r flex justify-center items-center py-1 gap-x-4'>
							<InsertCommentIcon /> {comments.length}
						</div>
						<div className='flex justify-center items-center py-1 w-2/4 gap-x-4'>
							<FavoriteIcon />
							{likes.length}
						</div>
					</div>
					<hr className='' />
					<Link to={'/home/' + user.id}>
						<div className='font-semibold break-words line-clamp-2 text-xs flex items-center px-4 py-2 cursor-pointer'>
							<img
								src={user.picture}
								alt=''
								className='w-5 h-5 mr-2 rounded-full'
							/>
							{user.name}
						</div>
					</Link>
				</>
			) : null}
		</div>
	);
};

export default Card;
