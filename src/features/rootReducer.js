import { combineReducers } from "redux";
import { reducer as movieListReducer } from './movieList';
import { reducer as favouriteListReducer} from './favouriteList'

const rootReducer = combineReducers({
    movieList: movieListReducer,
    favouriteList: favouriteListReducer
});

export default rootReducer;
