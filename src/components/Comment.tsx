import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { AppDispatch, RootState } from '../stores/store';
import './TodoDetailModal.scss';
// import "../../assets/styles/date-picker.css";
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dummyUserId } from '../dummy-data';
import {
	Comment,
	deleteComment,
	updateComment,
} from '../stores/todos/todo.slice';
import './Comment.scss';

const Comment = (props: { comment: Comment }) => {
	const { comment } = props;
	console.log(comment);
	const dispatch = useDispatch<AppDispatch>();
	const currentTodoDetail = useSelector(
		(store: RootState) => store.todo.myCurrentTodo
	);
	const [isEditingComment, setIsEditingComment] = useState(false);
	const [editedComment, setEditedComment] = useState('');

	const onEditComment = (initialComment: string) => {
		setEditedComment(initialComment);
		setIsEditingComment(true);
	};

	const onCommitComment = () => {
		console.log(editedComment);
		dispatch(updateComment(comment.id, editedComment));
		setIsEditingComment(false);
	};

	const onRollbackComment = () => {
		setIsEditingComment(false);
	};

	const [isConfirmingDelete, setIsConfirmDelete] = useState(false);
	const onClickDelete = () => {
		setIsConfirmDelete(true);
	};
	const onCancelDelete = () => {
		setIsConfirmDelete(false);
	};
	const onConfirmDelete = () => {
		if (!currentTodoDetail) return;
		dispatch(
			deleteComment(currentTodoDetail.id, currentTodoDetail.status, comment.id)
		);
	};

	return (
		<div className='bg-gray-600 p-2 rounded-md'>
			<div className='flex'>
				<div className='w-[95%] min-w-0'>
					<div className='flex'>
						<img
							src={comment.user.picture}
							className='w-6 h-6 rounded-full mr-2'
						/>
						<span className='font-bold text-sm'>
							{comment.user.name}{' '}
							<span className='font-thin'>commented on</span>{' '}
							{format(parseISO(comment.createdAt), 'yyyy/MM/dd HH:mm')}
						</span>
					</div>
					<hr className='w-1/3 border-2 my-2 border-dotted' />
					{isEditingComment ? (
						<TextField
							label='comment'
							multiline
							value={editedComment}
							onChange={(e) => {
								console.log(e);
								setEditedComment(e.target.value);
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
					) : (
						<div className='mt-2 px-4 break-words'>{comment.content}</div>
					)}
				</div>
				{comment.user.id === dummyUserId && (
					<div className='ml-2'>
						<div className='flex mb-2 justify-end'>
							{isConfirmingDelete ? (
								<>
									<div className='mt-auto border rounded-md cursor-pointer  mx-2'>
										<KeyboardReturnIcon className='' onClick={onCancelDelete} />
									</div>
									<div className='mt-auto border rounded-md cursor-pointer bg-red-800'>
										<DeleteIcon className='' onClick={onConfirmDelete} />
									</div>
								</>
							) : (
								<>
									<div className='mx-2 w-6'></div>
									<div className='mt-auto border rounded-md cursor-pointer'>
										<DeleteIcon className='' onClick={onClickDelete} />
									</div>
								</>
							)}
						</div>
						<div className='flex justify-end'>
							{isEditingComment ? (
								<>
									<div className='mt-auto border rounded-md cursor-pointer mx-2'>
										<CheckIcon className='' onClick={onCommitComment} />
									</div>
									<div className='mt-auto border rounded-md cursor-pointer'>
										<CloseIcon className='' onClick={onRollbackComment} />
									</div>
								</>
							) : (
								<>
									<div className='mx-2 w-6'></div>
									<div className='mt-auto border rounded-md cursor-pointer'>
										<EditIcon
											className=''
											onClick={() => onEditComment(comment.content)}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Comment;
