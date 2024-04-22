import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import generalReducer from '../redux/reducers/reducer';

const store = configureStore({
	reducer: {
		reducer: generalReducer,
	},
	middleware: [thunk]
});

export default store;
