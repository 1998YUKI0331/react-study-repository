import books from './bookReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    books
});

export default rootReducer;