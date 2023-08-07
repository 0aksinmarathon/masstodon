import { useEffect, useState } from 'react';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { dummyData } from '../dummy-data';
import { AppDispatch, RootState } from '../stores/store';
import {
	Status,
	exchangeTodos,
	setCurrentTodo,
	setMyTodos,
} from '../stores/todos/todo.slice';
import Card from './Card';
import TodoDetailModal from './TodoDetailModal';

const Board = () => {
	const currentTodoDetail = useSelector((store: RootState) => {
		console.log('selector', store.todo.myCurrentTodo);
		return store.todo.myCurrentTodo;
	});

	const myTodos = useSelector((store: RootState) => {
		console.log('selector', store.todo.myTodos);
		return store.todo.myTodos;
	});

	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		// console.log(a);
		dispatch(setMyTodos());
	}, []);
	const [data, setData] = useState(dummyData);

	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
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

	return (
		<div>
			<div className='bg-slate-700 py-2 px-20'>adsvcasva;sjdfvhkadfs</div>
			<div>
				<DragDropContext onDragEnd={onDragEnd}>
					{currentTodoDetail ? (
						<TodoDetailModal
							open={isDetailModalOpen}
							handleClose={() => setIsDetailModalOpen(false)}
							todo={currentTodoDetail}
						/>
					) : null}
					<div className='flex mt-5 px-4'>
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
												{myTodos[column.id as Status].map((todo, index) => {
													console.log(12321);
													return (
														<Draggable
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
																		opacity: snapshot.isDragging ? '0.3' : '1',
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
												})}
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
