import { configureStore } from '@reduxjs/toolkit';

import todoReducer from './todos/todo.slice';

// import accountReducer from "./features/accounts/accountSlice";
// import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
	reducer: {
		todo: todoReducer,
		// customer: customerReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
