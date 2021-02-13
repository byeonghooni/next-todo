import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../types/todo';

export const SET_TODO_LIST = 'todo/INIT_TODO_LIST';

interface TodoReduxState {
	todos: TodoType[];
}

const initialState: TodoReduxState = {
	todos: [],
};

const todo = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setTodoList(state, action: PayloadAction<TodoType[]>) {
			state.todos = action.payload;
		},
	},
});

export const todoActions = {
	...todo.actions,
};

export default todo;
