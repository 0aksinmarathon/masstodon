import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { dummyData, dummyUserId } from '../dummy-data';
import { AppDispatch, RootState } from '../stores/store';
import {
	Status,
	Todo,
	exchangeTodos,
	getPublicTodos,
	setCurrentTodo,
	setMyTodos,
} from '../stores/todos/todo.slice';
import Card from './Card';
import TodoDetailModal from './TodoDetailModal';
import TodoAddModal from './TodoAddModal';
import { useParams } from 'react-router-dom';

const Board = () => {
	const { userId } = useParams();
	const user = userId
		? useSelector((store: RootState) => store.user.user)
		: useSelector((store: RootState) => store.auth.user);
	const currentTodoDetail = useSelector((store: RootState) => {
		console.log('selector', store.todo.myCurrentTodo);
		return store.todo.myCurrentTodo;
	});

	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		console.log(authUser);
		if (!authUser) {
			dispatch(getPublicTodos());
		}
		if (user) {
			dispatch(setMyTodos(user.id));
			dispatch(getPublicTodos(user.id));
		}
	}, [user]);
	const [data, setData] = useState(dummyData);

	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	// const [currentTodoDetail, setCurrentTodoDetail] = useState<Todo | null>(null);

	const onDragEnd = async (result: DropResult) => {
		await dispatch(exchangeTodos(result));
	};

	const onClickCard = async (id: number) => {
		await dispatch(setCurrentTodo(id));
		console.log('onClickCard', currentTodoDetail);
		if (!currentTodoDetail) return;

		setIsDetailModalOpen(true);
	};

	const onClickAddTodo = async () => {
		setIsAddModalOpen(true);
	};
	const authUser = useSelector((store: RootState) => store.auth.user);

	const [mode, setMode] = useState(authUser || userId ? 'yours' : 'public');

	const todos =
		mode === 'yours'
			? useSelector((store: RootState) => {
					return store.todo.myTodos;
			  })
			: useSelector((store: RootState) => {
					return store.todo.publicTodos;
			  });

	const filterTodos = (todos: Todo[]): Todo[] => {
		if (titleFilter) {
			todos = todos.filter(({ title }) => title.includes(titleFilter));
		}
		if (idFilter) {
			todos = todos.filter(({ id }) => String(id).includes(idFilter));
		}
		if (userNameFilter) {
			todos = todos.filter(({ user: { name } }) =>
				String(name).includes(userNameFilter)
			);
		}

		return todos;
	};
	const [titleFilter, setTitleFilter] = useState('');
	const [idFilter, setIdFilter] = useState('');
	const [userNameFilter, setUserNameFilter] = useState('');

	return (
		<div className='w-full '>
			<div className='bg-slate-700 py-2 px-10 flex gap-x-10 font-bold'>
				<div
					className={` ${mode === 'yours' ? 'border-b-4' : ''} ${
						!authUser && !userId
							? 'opacity-50 cursor-default'
							: 'cursor-pointer'
					} `}
					onClick={() => authUser && setMode('yours')}
				>
					Yours
				</div>
				<div
					className={`${mode === 'public' ? 'border-b-4' : ''}  ${
						userId ? 'opacity-50 cursor-default' : 'cursor-pointer'
					}`}
					onClick={() => !userId && setMode('public')}
				>
					Public
				</div>
			</div>
			<div className='bg-slate-600 py-2 px-10 flex font-thin text-sm'>
				<div className='mr-4'>Title: </div>
				<input
					className='mr-10 text-gray-600 px-1'
					onChange={(e) => setTitleFilter(e.target.value)}
				></input>
				<div className='mr-4'>ID: </div>
				<input
					className='mr-10 text-gray-600 px-1'
					onChange={(e) => setIdFilter(e.target.value)}
				></input>
				<div className='mr-4'>User Name: </div>
				<input
					className='mr-10 text-gray-600 px-1'
					onChange={(e) => setUserNameFilter(e.target.value)}
				></input>
			</div>
			{authUser && !userId && (
				<AddIcon
					className='bg-gray-400 rounded-md ml-8 mt-2'
					onClick={onClickAddTodo}
				/>
			)}
			<div>
				<DragDropContext onDragEnd={onDragEnd}>
					{currentTodoDetail ? (
						<TodoDetailModal
							open={isDetailModalOpen}
							handleClose={() => setIsDetailModalOpen(false)}
							todo={currentTodoDetail}
						/>
					) : null}
					<TodoAddModal
						open={isAddModalOpen}
						handleClose={() => setIsAddModalOpen(false)}
					/>
					<div className='flex mt-2 px-4'>
						{data.map((column) => {
							return (
								<Droppable key={column.id} droppableId={column.id}>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											// draggable hidden behind droppable when drop-shadow applies on droppable
											className='p-2.5 rounded-lg ml-2.5 w-[400px]  bg-gray-400'
										>
											<div className='font-bold text-xl mb-2.5'>
												{column.title}
											</div>
											<div className='flex flex-col gap-y-4'>
												{filterTodos(todos[column.id as Status]).map(
													(todo, index) => {
														return (
															<Draggable
																isDragDisabled={mode === 'public' || !!userId}
																draggableId={String(todo.id)}
																index={index}
																key={String(todo.id)}
															>
																{(provided2, snapshot) => (
																	<div
																		ref={provided2.innerRef}
																		{...provided2.draggableProps}
																		{...provided2.dragHandleProps}
																		style={{
																			...provided2.draggableProps.style,
																			opacity: snapshot.isDragging
																				? '0.3'
																				: '1',
																		}}
																		className='grid !static'
																		onClick={() => {
																			onClickCard(todo.id);
																		}}
																	>
																		<Card todo={todo} />
																	</div>
																)}
															</Draggable>
														);
													}
												)}
											</div>
										</div>
									)}
								</Droppable>
							);
						})}
					</div>
				</DragDropContext>
			</div>
		</div>
	);
};

export default Board;
