import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { container } from 'tsyringe';
import { ITodoRepository } from '../../repositories/todo.repository.interface';
import { DropResult } from 'react-beautiful-dnd';

export interface Todo {
	id: number;
	title: string;
	description: string;
	progress: number;
	status: Status;
	isPrivate: boolean;
	startDate: string;
	endDate: string;
	dueDate: string;
	sortKey: number;
	tags: Tag[];
	comments: Comment[];
	likes: Likes[];
	user: User;
}
export interface TodoDetail {
	id: string;
	title: string;
	description: string;
	progress: number;
	isPrivate: boolean;
	startDate: string;
	endDate: string;
	dueDate: string;
	sortKey: number;
	tags: Tag[];
	comments: Comment[];
	user: User[];
}

export interface Comment {
	id: number;
	userName: string;
	content: string;
}
export interface Tag {
	id: number;
	name: string;
}

export interface User {
	name: string;
	picture: string;
}

export interface Likes {
	user_id: number;
}

export type Status = 'planning' | 'workInProgress' | 'finished';

interface TodoSlice {
	myTodos: { planning: Todo[]; workInProgress: Todo[]; finished: Todo[] };
	myCurrentTodo: Todo | null;
}

const initialState: TodoSlice = {
	myTodos: { planning: [], workInProgress: [], finished: [] },
	myCurrentTodo: null,
};

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setMyTodos(state, action) {
			state.myTodos.planning = action.payload['planning'];
			state.myTodos.workInProgress = action.payload['workInProgress'];
			state.myTodos.finished = action.payload['finished'];

			console.log(action.payload);
			console.log(state.myTodos);
		},
		setCurrentTodo(state, action) {
			state.myCurrentTodo = action.payload;
			console.log(action.payload);
		},
		exchangeTodos(state, action) {
			const { source, destination } = action.payload as DropResult;
			if (!destination) return;
			console.log(source);
			console.log(destination);
			if (source.droppableId !== destination?.droppableId) {
				const sourceCol = state.myTodos[source.droppableId as Status];
				const destinationCol = state.myTodos[destination.droppableId as Status];
				const [removed] = sourceCol.splice(source.index, 1);
				destinationCol.splice(destination?.index, 0, removed);
			} else {
				const sourceCol = state.myTodos[source.droppableId as Status];
				const [removed] = sourceCol.splice(source.index, 1);
				sourceCol.splice(destination?.index, 0, removed);
			}
		},

		deleteTag(state, action) {
			const { todoId, status, tagId } = action.payload as DeleteTagParams;
			const todoIndex = state.myTodos[status as Status].findIndex(
				({ id }) => id === todoId
			);
			state.myTodos[status as Status][todoIndex].tags = state.myTodos[
				status as Status
			][todoIndex].tags.filter(({ id }) => id !== tagId);
			if (!state.myCurrentTodo) return;
			state.myCurrentTodo.tags = state.myCurrentTodo.tags.filter(
				({ id }) => id !== tagId
			);
		},

		updateTitle(state, action) {
			console.log('action updateTitle');
			const { todoId, status, title } = action.payload;
			const todoIndex = state.myTodos[status as Status].findIndex(
				({ id }) => id === todoId
			);
			state.myTodos[status as Status][todoIndex].title = title;
			if (!state.myCurrentTodo) return;
			state.myCurrentTodo.title = title;
		},

		updateDescription(state, action) {
			console.log('action updateDescription');
			const { todoId, status, description } = action.payload;
			const todoIndex = state.myTodos[status as Status].findIndex(
				({ id }) => id === todoId
			);
			state.myTodos[status as Status][todoIndex].description = description;
			if (!state.myCurrentTodo) return;
			state.myCurrentTodo.description = description;
		},
	},
});

export function setMyTodos() {
	return async (dispatch: Dispatch) => {
		const todoRepository = container.resolve<ITodoRepository>('TodoRepository');
		const myTodos = await todoRepository.getMyTodoList();
		console.log(myTodos);
		console.log('setMyTodos thunk');
		dispatch({ type: 'todo/setMyTodos', payload: myTodos });
	};
}

export function setCurrentTodo(id: number) {
	return async (dispatch: Dispatch) => {
		const todoRepository = container.resolve<ITodoRepository>('TodoRepository');
		const currentTodo = await todoRepository.getTodoDetail(id);
		console.log(currentTodo);
		if (!currentTodo || currentTodo.length !== 1) {
			throw new Error('something is wrong about fetched data');
		}

		console.log('setCurrentTodo thunk');
		dispatch({ type: 'todo/setCurrentTodo', payload: currentTodo[0] });
	};
}

export function exchangeTodos(result: DropResult) {
	return async (dispatch: Dispatch) => {
		// TODO DB sort logic
		// const todoRepository = container.resolve<ITodoRepository>('TodoRepository');
		console.log('exchangeTodos thunk');
		dispatch({ type: 'todo/exchangeTodos', payload: result });
	};
}

export interface DeleteTagParams {
	todoId: number;
	status: Status;
	tagId: number;
}
export function deleteTag(todoId: number, status: Status, tagId: number) {
	return async (dispatch: Dispatch) => {
		console.log('deleteTag thunk');
		const todoRepository = container.resolve<ITodoRepository>('TodoRepository');
		await todoRepository.deleteTag(tagId);
		dispatch({
			type: 'todo/deleteTag',
			payload: { todoId, status, tagId },
		});
	};
}

export function updateTitle(todoId: number, status: Status, title: string) {
	return async (dispatch: Dispatch) => {
		console.log('updateTitle thunk');
		const todoRepository = container.resolve<ITodoRepository>('TodoRepository');
		await todoRepository.updateTitle(todoId, title);
		dispatch({
			type: 'todo/updateTitle',
			payload: { todoId, status, title },
		});
	};
}

export function updateDescription(
	todoId: number,
	status: Status,
	description: string
) {
	return async (dispatch: Dispatch) => {
		console.log('updateDescription thunk');
		const todoRepository = container.resolve<ITodoRepository>('TodoRepository');
		await todoRepository.updateDescription(todoId, description);
		dispatch({
			type: 'todo/updateDescription',
			payload: { todoId, status, description },
		});
	};
}

export default todoSlice.reducer;
