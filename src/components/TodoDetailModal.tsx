import {
	Status,
	Todo,
	TodoDetail,
	addTag,
	deleteTag,
	updateDescription,
	updateDueDate,
	updateEndDate,
	updateStartDate,
	updateTitle,
} from '../stores/todos/todo.slice';
import './TodoDetailModal.scss';
import Modal from '@mui/material/Modal';
import { Circle } from 'rc-progress';
import { getColor } from '../common/util/get-color';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { parse, parseISO } from 'date-fns';
import { AppDispatch } from '../stores/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { TextField } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { getDisplayDate } from '../common/util/date';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import "../../assets/styles/date-picker.css";

const TodoDetailModal = (props: {
	todo: Todo;
	open: any;
	handleClose: any;
}) => {
	const {
		todo: {
			id,
			title,
			description,
			status,
			progress,
			tags,
			comments,
			startDate,
			endDate,
			dueDate,
			likes,
		},
		open,
		handleClose,
	} = props;

	const dispatch = useDispatch<AppDispatch>();
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [editedTitle, setEditedTitle] = useState('');

	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const [editedDescription, setEditedDescription] = useState('');

	const [isAddingTag, setIsAddingTag] = useState(false);
	const [addedTag, setAddedTag] = useState('');

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

	const onAddTitle = () => {
		console.log('onAddTitle');
		setAddedTag('');
		setIsAddingTag(true);
	};

	const onCommitTag = () => {
		console.log(editedTitle);
		dispatch(addTag(id, status, addedTag));
		setIsAddingTag(false);
	};

	const onRollbackTag = () => {
		setIsAddingTag(false);
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
				<div className=' py-2 '>
					<div className='flex flex-wrap gap-x-4 gap-y-1 items-center '>
						{tags.length !== 0 ? (
							<div className='flex mr-auto  flex-grow justify-center'>
								{tags.map(({ id: tagId, name }) => {
									console.log(isAddingTag);
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
								})}
							</div>
						) : (
							<div className='text-xs flex justify-center flex-grow mr-auto'>
								No tag is set on this todo...
							</div>
						)}
						{isAddingTag && (
							<div className='w-25'>
								<TextField
									value={addedTag}
									onChange={(e) => {
										console.log(e);
										setAddedTag(e.target.value);
									}}
									size='small'
									fullWidth
									inputProps={{
										style: {
											color: 'white',
											fontSize: '12px',
											padding: '4px',

											// single quote required to make it work
											fontFamily: "'M PLUS Rounded 1c'",
										},
									}}
								/>
							</div>
						)}
						{!isAddingTag ? (
							<div className='mt-auto border rounded-md cursor-pointer'>
								<AddIcon className='' onClick={onAddTitle} />
							</div>
						) : (
							<div className='flex'>
								<div className='mt-auto border rounded-md cursor-pointer mx-2'>
									<CheckIcon className='' onClick={onCommitTag} />
								</div>
								<div className='mt-auto border rounded-md cursor-pointer'>
									<CloseIcon className='' onClick={onRollbackTag} />
								</div>
							</div>
						)}
					</div>
				</div>
				<hr className='' />
				<div className='px-4  rounded-b-md flex text-sm'>
					<div className='w-2/4 border-r flex justify-center items-center py-1 gap-x-4'>
						<PlayArrowIcon />{' '}
						<DatePicker
							selected={startDate ? parseISO(startDate) : null}
							onChange={(e) => {
								dispatch(updateStartDate(id, status, e));
							}}
							isClearable
							dateFormat='yyyy/MM/dd'
							placeholderText='Start Date'
						/>
					</div>
					<div className='flex justify-center items-center py-1 w-2/4 gap-x-4'>
						<DoneOutlineIcon />
						<DatePicker
							selected={endDate ? parseISO(endDate) : null}
							onChange={(e) => {
								dispatch(updateEndDate(id, status, e));
							}}
							isClearable
							dateFormat='yyyy/MM/dd'
							placeholderText='End Date'
						/>
					</div>
				</div>
				<hr className='' />
				<div className='flex justify-center items-center py-1 gap-x-4 text-sm'>
					<AlarmOnIcon />

					<DatePicker
						selected={dueDate ? parseISO(dueDate) : null}
						onChange={(e) => {
							dispatch(updateDueDate(id, status, e));
						}}
						isClearable
						dateFormat='yyyy/MM/dd'
						placeholderText='Due Date'
					/>
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
