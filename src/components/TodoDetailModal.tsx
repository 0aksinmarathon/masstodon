import { Todo, TodoDetail, deleteTag } from '../stores/todos/todo.slice';
import Modal from '@mui/material/Modal';
import { Circle } from 'rc-progress';
import { getColor } from '../common/util/getColor';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CancelIcon from '@mui/icons-material/Cancel';
import { AppDispatch } from '../stores/store';
import { useDispatch } from 'react-redux';

const TodoDetailModal = (props: {
	todo: Todo;
	open: any;
	handleClose: any;
}) => {
	const {
		todo: { id, title, description, status, progress, tags, comments, likes },
		open,
		handleClose,
	} = props;

	const dispatch = useDispatch<AppDispatch>();

	return (
		<Modal open={open} onClose={handleClose}>
			<div className='w-[800px] h-[400px] bg-gray-500 rounded-xl fixed inset-0 m-auto overflow-y-auto p-5 drop-shadow-hard2'>
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

				<hr className='my-2 w-[30%] border-2' />
				<div className='rounded-t-md pb-2'>
					<div className='break-words line-clamp-3 text-sm'>{description}</div>
				</div>
				<hr className='' />
				<div className='px-4 py-2 '>
					<div className='flex flex-wrap gap-x-4 gap-y-1 justify-center'>
						{tags.length !== 0 ? (
							tags.map(({ id: tagId, name }) => {
								return (
									<>
										<div className='flex'>
											<div className='rounded-md px-2 bg-gray-800 text-xs h-5 pt-0.5 '>
												{name}
											</div>
											<CancelIcon
												className='cursor-pointer'
												sx={{
													width: '16px',
													position: 'relative',
													bottom: '12px',
													right: '8px',
												}}
												onClick={() => dispatch(deleteTag(id, status, tagId))}
											/>
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
			</div>
		</Modal>
	);
};

export default TodoDetailModal;
