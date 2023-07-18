import {
	Action,
	AnyAction,
	ThunkDispatch,
	createSlice,
} from '@reduxjs/toolkit';
import { container } from 'tsyringe';
import { ITodoRepository } from '../../repositories/todo.repository.interface';

const todoRepository = container.resolve<ITodoRepository>('TodoRepository');

const initialState = {
	todos: [],
	currentTodo: null,
};

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setCurrentTodo(state, action) {
			state.currentTodo = action.payload;
			console.log(action.payload);
		},
	},
});

// export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function setCurrentTodo(id: number) {
	return async (
		dispatch: ThunkDispatch<typeof initialState, void, AnyAction>
	) => {
		const currentTodo = await todoRepository.getTodoDetail(id);
		if (currentTodo.length !== 1) {
			throw new Error('something is wrong about fetched data');
		}
		console.log('setCurrentTodo thunk');
		dispatch({ type: 'todo/setCurrentTodo', payload: currentTodo });
	};
}

export default todoSlice.reducer;
