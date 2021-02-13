import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useSelector as useReduxSelector,
} from 'react-redux';
import todo from './todo';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const rootReducer = combineReducers({
	todo: todo.reducer,
});

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state,
			...action.payload,
		};

		if (state.count) {
			nextState.count = state.count;
		}

		return nextState;
	}
	return rootReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
	return configureStore({
		reducer,
		devTools: true,
	});
};

export const wrapper = createWrapper(initStore);
