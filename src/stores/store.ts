import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/auth.slice';
import todoReducer from './todos/todo.slice';
import userReducer from './users/user.slice';

// import accountReducer from "./features/accounts/accountSlice";
// import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
	reducer: {
		todo: todoReducer,
		auth: authReducer,
		user: userReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
