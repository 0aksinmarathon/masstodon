import {
	Status,
	Todo,
	TodoDetail,
	deleteTag,
	updateDescription,
	updateTitle,
} from '../stores/todos/todo.slice';
import Modal from '@mui/material/Modal';
import { Circle } from 'rc-progress';
import { getColor } from '../common/util/getColor';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { AppDispatch } from '../stores/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { ClassNames } from '@emotion/react';

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
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [editedTitle, setEditedTitle] = useState('');

	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const [editedDescription, setEditedDescription] = useState('');

	const onEditTitle = (initialTitle: string) => {
		setEditedTitle(initialTitle);
		setIsEditingTitle(true);
	};

	const onCommitTitle = () => {
		console.log(editedTitle);
		dispatch(updateTitle(id, status, editedTitle));
		setIsEditingTitle(false);
	};

	const onRollbackTitle = () => {
		setIsEditingTitle(false);
	};

	const onEditDescription = (initialTitle: string) => {
		setEditedDescription(initialTitle);
		setIsEditingDescription(true);
	};

	const onCommitDescription = () => {
		console.log(editedTitle);
		dispatch(updateDescription(id, status, editedDescription));
		setIsEditingDescription(false);
	};

	const onRollbackDescription = () => {
		setIsEditingDescription(false);
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<div className='w-[800px] h-[400px] bg-gray-500 rounded-xl fixed inset-0 m-auto overflow-y-auto py-5 pl-5 pr-10 drop-shadow-hard2'>
				<div className='flex justify-between'>
					<div className='break-words line-clamp-3 text-xs mb-2 border w-[100px] flex justify-center items-center'>
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
				<div className='flex justify-between items-center mt-2'>
					{!isEditingTitle ? (
						<>
							<div className='font-semibold break-words line-clamp-2 text-lg  mr-4'>
								{title}
							</div>

							<div className='mt-auto border rounded-md cursor-pointer'>
								<EditIcon className='' onClick={() => onEditTitle(title)} />
							</div>
						</>
					) : (
						<>
							<TextField
								label='title'
								multiline
								// maxRows={4}
								value={editedTitle}
								onChange={(e) => {
									console.log(e);
									setEditedTitle(e.target.value);
								}}
								className='w-full'
								inputProps={{
									style: {
										color: 'white',
										fontSize: '18px',
										// single quote required to make it work
										fontFamily: "'M PLUS Rounded 1c'",
									},
								}}
							/>
							<div className='mt-auto border rounded-md cursor-pointer mx-2'>
								<CheckIcon className='' onClick={onCommitTitle} />
							</div>
							<div className='mt-auto border rounded-md cursor-pointer'>
								<CloseIcon className='' onClick={onRollbackTitle} />
							</div>
						</>
					)}
				</div>

				<hr className='my-2 w-[100%] border-2' />
				<div className='rounded-t-md pb-2  flex justify-between items-center'>
					{!isEditingDescription ? (
						<>
							<div className='break-words line-clamp-5 text-sm mr-4'>
								{description}
							</div>
							<div className='mt-auto border rounded-md cursor-pointer'>
								<EditIcon
									className=''
									onClick={() => onEditDescription(description)}
								/>
							</div>
						</>
					) : (
						<>
							<TextField
								label='description'
								multiline
								// maxRows={4}
								value={editedDescription}
								onChange={(e) => {
									console.log(e);
									setEditedDescription(e.target.value);
								}}
								className='w-full'
								inputProps={{
									style: {
										color: 'white',
										fontSize: '18px',
										// single quote required to make it work
										fontFamily: "'M PLUS Rounded 1c'",
									},
								}}
							/>
							<div className='mt-auto border rounded-md cursor-pointer mx-2'>
								<CheckIcon className='' onClick={onCommitDescription} />
							</div>
							<div className='mt-auto border rounded-md cursor-pointer'>
								<CloseIcon className='' onClick={onRollbackDescription} />
							</div>
						</>
					)}
				</div>
				<hr className='' />
				<div className='px-4 py-2 '>
					<div className='flex flex-wrap gap-x-4 gap-y-1 justify-center '>
						{tags.length !== 0 ? (
							tags.map(({ id: tagId, name }) => {
								return (
									<>
										<div className='flex items-center'>
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
