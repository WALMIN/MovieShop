import { combineReducers } from "redux";
import {reducer as movieListReducer} from './movieList';

const rootReducer = combineReducers({
    movieList: movieListReducer
});

export default rootReducer;