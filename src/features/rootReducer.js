import { combineReducers } from "redux";
import { reducer as movieListReducer } from './movieList';
import { reducer as cartListReducer } from './cartList';
import {reducer as favouriteListReducer} from './favouriteList'

const rootReducer = combineReducers({
    movieList: movieListReducer,
    cartList: cartListReducer,
    favouriteList: favouriteListReducer
});

export default rootReducer;
