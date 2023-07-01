import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export default function configureStore(onCompletion){
	const enhancer = compose(
		applyMiddleware(
			thunk,
		)
	);

	const store = createStore(rootReducer, enhancer);
	return store;
}