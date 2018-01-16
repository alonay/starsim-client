import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from '../reducers/auth';
import reduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
);
