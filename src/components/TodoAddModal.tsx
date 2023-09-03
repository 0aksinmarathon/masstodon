import AlarmOnIcon from '@mui/icons-material/AlarmOn';

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import PercentIcon from '@mui/icons-material/Percent';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';
import { Status, Todo, addTodo } from '../stores/todos/todo.slice';
import './TodoDetailModal.scss';
import { useNavigate } from 'react-router-dom';

import { blueGrey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
const TodoAddModal = (props: { open: any; handleClose: any }) => {
	const { open, handleClose } = props;

	const user = useSelector((store: RootState) => store.auth.user);

	const dispatch = useDispatch<AppDispatch>();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [progress, setProgress] = useState(0);
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());
	const [dueDate, setDueDate] = useState<Date | null>(new Date());
	const [status, setStatus] = useState<Status>('planning');

	const navigate = useNavigate();

	const onClickCheckIcon = () => {
		dispatch(
			addTodo(
				user.id,
				title,
				description,
				progress,
				startDate,
				endDate,
				dueDate,
				status
			)
		);
		handleClose();
		clearFields();
		navigate(0);
	};

	const onClose = () => {
		handleClose();
		clearFields();
	};

	const clearFields = () => {
		setTitle('');
		setDescription('');
		setProgress(0);
		setStartDate(new Date());
		setEndDate(new Date());
		setDueDate(new Date());
		setStatus('planning');
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div className='w-[800px] h-fit bg-gray-500 rounded-xl fixed inset-0 m-auto overflow-y-auto py-5 pl-5 pr-10 drop-shadow-hard2'>
				<div className='font-bold text-lg mb-2'>Create Todo</div>
				<div className='flex justify-between items-center mt-1'>
					<TextField
						label='title'
						multiline
						required
						// maxRows={4}
						value={title}
						onChange={(e) => {
							console.log(e);
							setTitle(e.target.value);
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
				</div>

				<hr className='my-2 w-[100%] border-2' />
				<div className='rounded-t-md pb-2  flex justify-between items-center'>
					<TextField
						label='description'
						multiline
						// maxRows={4}
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
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
				</div>
				<hr className='' />
				<div className='px-4  rounded-b-md flex text-sm'>
					<div className='w-2/4 border-r flex justify-center items-center py-1 gap-x-4'>
						<PlayArrowIcon />{' '}
						<DatePicker
							selected={startDate}
							onChange={(e) => setStartDate(e)}
							isClearable
							dateFormat='yyyy/MM/dd'
							placeholderText='Start Date'
						/>
					</div>
					<div className='flex justify-center items-center py-1 w-2/4 gap-x-4'>
						<DoneOutlineIcon />
						<DatePicker
							selected={endDate}
							onChange={(e) => setEndDate(e)}
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
						selected={dueDate}
						onChange={(e) => setDueDate(e)}
						isClearable
						dateFormat='yyyy/MM/dd'
						placeholderText='Due Date'
					/>
				</div>
				<hr className='' />

				<div className='mt-2  rounded-b-md flex text-sm items-center'>
					<div className='mr-3'>
						<PercentIcon />
					</div>
					<div className='w-full'>
						<Slider
							value={progress}
							step={1}
							marks
							min={0}
							max={100}
							onChange={(e) => {
								setProgress(Number((e.target as HTMLInputElement).value));
							}}
							style={{ color: blueGrey[900] }}
						/>
					</div>
					<span className='ml-4'>{progress}</span>
				</div>
				<div className='mt-2  rounded-b-md flex text-sm items-center'>
					<FlagIcon />
					<select
						name='status'
						value={status}
						onChange={(e) => setStatus(e.target.value as Status)}
						className='rounded-md bg-gray-500 border border-gray-600 ml-2 px-2 py-1'
					>
						<option value='planning'>Planning</option>
						<option value='workInProgress'>Work In Progress</option>
						<option value='finished'>Finished</option>
						<option value='archived'>Archived</option>
					</select>
				</div>
				<hr className='w-1/3 border-2 mt-4' />
				<div className='flex justify-start mt-4 gap-x-4'>
					<div
						className={`mt-auto border rounded-md cursor-pointer ${
							!title && 'cursor-default border-gray-600'
						}`}
					>
						<CheckIcon
							className=''
							onClick={onClickCheckIcon}
							color={title ? 'inherit' : 'disabled'}
						/>
					</div>
					<div className='mt-auto border rounded-md cursor-pointer'>
						<CloseIcon className='' onClick={onClose} />
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default TodoAddModal;
