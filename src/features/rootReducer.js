import { combineReducers } from "redux";
import { reducer as movieListReducer } from './movieList';
import { reducer as cartListReducer } from './cartList';

const rootReducer = combineReducers({
    movieList: movieListReducer,
    cartList: cartListReducer
});

export default rootReducer;
