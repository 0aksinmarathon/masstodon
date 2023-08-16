import AddIcon from '@mui/icons-material/Add';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import EditIcon from '@mui/icons-material/Edit';
import PercentIcon from '@mui/icons-material/Percent';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import { parseISO } from 'date-fns';
import { Circle } from 'rc-progress';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { getColor } from '../common/util/get-color';
import { AppDispatch } from '../stores/store';
import {
	Todo,
	addComment,
	addLike,
	addTag,
	deleteLike,
	deleteTag,
	setCurrentTodo,
	updateDescription,
	updateDueDate,
	updateEndDate,
	updateProgress,
	updateStartDate,
	updateStatusToArchive,
	updateTitle,
} from '../stores/todos/todo.slice';
import './TodoDetailModal.scss';
// import "../../assets/styles/date-picker.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { blueGrey, pink } from '@mui/material/colors';
import { dummyUserId } from '../dummy-data';
import Comment from './Comment';
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
			userId,
		},
		open,
		handleClose,
	} = props;
	console.log('todoDetailModal');

	const dispatch = useDispatch<AppDispatch>();
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [editedTitle, setEditedTitle] = useState('');
	const [tmpProgress, setTmpProgress] = useState(progress);
	useEffect(() => {
		console.log('todoDetailModal useEffect');
		setTmpProgress(progress);
		setIsEditingTitle(false);
		setEditedTitle('');
		setIsEditingDescription(false);
		setEditedDescription('');
		setIsAddingTag(false);
		setAddedTag('');
		setIsAddingComment(false);
		setAddedComment('');
	}, [props.todo]);

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

	const onClickLikeButton = () => {
		if (likes.find((like) => like.userId === dummyUserId)) {
			dispatch(deleteLike(id, status, dummyUserId));
		} else {
			dispatch(addLike(id, status, dummyUserId));
		}
	};

	const [isAddingComment, setIsAddingComment] = useState(false);
	const [addedComment, setAddedComment] = useState('');
	const onAddComment = () => {
		setIsAddingComment(true);
	};
	const onConfirmAddComment = async () => {
		await dispatch(addComment(id, status, addedComment, dummyUserId));
		await dispatch(setCurrentTodo(id));
		setIsAddingComment(false);
		setAddedComment('');
	};
	const onCancelAddComment = () => {
		setIsAddingComment(false);
		setAddedComment('');
	};

	const onClickSendToArchive = () => {
		dispatch(updateStatusToArchive(id, status));
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<div className='w-[800px] h-[400px] bg-gray-500 rounded-xl fixed inset-0 m-auto overflow-y-auto py-5 pl-5 pr-10 drop-shadow-hard2'>
				<div className='flex justify-between'>
					<div className='break-words line-clamp-3 text-xs mb-2 border w-[100px] flex justify-center items-center'>
						{id}
					</div>
					<div className='flex items-center'>
						<button
							className='flex justify-center items-center mr-4 border rounded-lg px-2 bg-white text-gray-400 cursor-pointer drop-shadow-hard1'
							onClick={onClickLikeButton}
						>
							<div className='mr-1'>
								{likes.find((like) => like.userId === dummyUserId) ? (
									<FavoriteIcon style={{ fill: pink[200] }} />
								) : (
									<FavoriteBorderIcon />
								)}
							</div>
							<div>{likes.length}</div>
						</button>
						<div className='w-[30px] opacity-75'>
							<Circle
								percent={tmpProgress}
								strokeWidth={20}
								steps={{
									count: 20,
									space: 5,
								}}
								strokeColor={getColor(tmpProgress)}
							/>
						</div>
						<div className='w-10 ml-2 flex justify-end'>{tmpProgress}%</div>
					</div>
				</div>
				{status === 'finished' && userId === dummyUserId && (
					<div
						className='mt-1 cursor-pointer flex justify-end text-sky-200 '
						onClick={onClickSendToArchive}
					>
						<span className='border-b border-sky-200'>Send To Archive</span>
					</div>
				)}

				<div className='flex justify-between items-center mt-1'>
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
											<div className='flex items-center' key={tagId}>
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

				<div className='px-4  rounded-b-md flex text-sm items-center'>
					<div className='mr-3'>
						<PercentIcon />
					</div>
					<div className='w-full'>
						<Slider
							value={tmpProgress}
							step={1}
							marks
							min={0}
							max={100}
							onChange={(e) => {
								setTmpProgress(Number((e.target as HTMLInputElement).value));
							}}
							onChangeCommitted={() => {
								dispatch(updateProgress(id, status, tmpProgress));
							}}
							style={{ color: blueGrey[900] }}
						/>
					</div>
				</div>
				{comments.length !== 0 ? (
					<div className='mt-10 flex gap-y-2 flex-col'>
						{[...comments]
							.sort((a, b) => {
								if (a.createdAt > b.createdAt) return 1;
								else if (a.createdAt < b.createdAt) return -1;
								else return 0;
							})
							.map((comment) => (
								<>
									<Comment comment={comment} key={comment.id} />
								</>
							))}
					</div>
				) : (
					<div className='mt-10 flex text-xs justify-center'>
						<div>Be the first to post a comment!</div>
					</div>
				)}
				{!isAddingComment ? (
					<div className='border rounded-md cursor-pointer mt-2 w-[26px]'>
						<AddIcon className='' onClick={onAddComment} />
					</div>
				) : (
					<div className='bg-gray-600 p-2 rounded-md mt-2'>
						<div className='flex'>
							<div className='w-[95%] min-w-0'>
								<TextField
									label='comment'
									multiline
									value={addedComment}
									onChange={(e) => {
										console.log(e);
										setAddedComment(e.target.value);
									}}
									className='mt-1'
									fullWidth
									inputProps={{
										style: {
											color: 'white',
											fontSize: '16px',
											// single quote required to make it work
											fontFamily: "'M PLUS Rounded 1c'",
										},
									}}
								/>
							</div>

							<div className='ml-2'>
								<div className='flex justify-end'>
									<div className='mt-auto border rounded-md cursor-pointer'>
										<CheckIcon className='' onClick={onConfirmAddComment} />
									</div>
									<div className='mt-auto border rounded-md cursor-pointer mx-2'>
										<CloseIcon className='' onClick={onCancelAddComment} />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default TodoDetailModal;
