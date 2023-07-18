import React, { useEffect, useState } from 'react';
import { dummyData } from '../dummy-data';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import Card from './Card';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { TodoRepository } from '../repositories/supabase/todo.repository';
import { setCurrentTodo } from '../stores/todos/todo.slice';

const Board = () => {
	const a = useSelector((store) => store.todo);
	const dispatch = useDispatch();
	// dispatch(setCurrentTodo(1));
	const c = new TodoRepository();
	c.getTodoDetail(1);
	// const b = () => {
	// 	dispatch();
	// };
	useEffect(() => {
		console.log(a);
	}, []);
	const [data, setData] = useState(dummyData);

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (!destination) return;
		if (source.droppableId !== destination?.droppableId) {
			const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
			const sourceCol = data[sourceColIndex];
			const destinationColIndex = data.findIndex(
				(e) => e.id === destination.droppableId
			);
			const destinationCol = data[destinationColIndex];
			const sourceTask = [...sourceCol.tasks];
			const destinationTask = [...destinationCol.tasks];
			const [removed] = sourceTask.splice(source.index, 1);
			destinationTask.splice(destination?.index, 0, removed);
			data[sourceColIndex].tasks = sourceTask;
			data[destinationColIndex].tasks = destinationTask;
			setData(data);
		} else {
			const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
			const sourceCol = data[sourceColIndex];
			const sourceTask = [...sourceCol.tasks];
			const [removed] = sourceTask.splice(source.index, 1);
			sourceTask.splice(destination?.index, 0, removed);
			data[sourceColIndex].tasks = sourceTask;
			setData(data);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='flex'>
				{data.map((column) => (
					<Droppable key={column.id} droppableId={column.id}>
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className='trello-section'
							>
								<div className='trello-section-title'>{column.title}</div>
								<div className='trello-section-content flex flex-col gap-y-2'>
									{column.tasks.map((task, index) => (
										<Draggable
											draggableId={task.id}
											index={index}
											key={task.id}
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
													className='grid gap-x-5'
												>
													<Card task={task} />
												</div>
											)}
										</Draggable>
									))}
								</div>
							</div>
						)}
					</Droppable>
				))}
			</div>
		</DragDropContext>
	);
};

export default Board;
