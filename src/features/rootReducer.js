import { combineReducers } from "redux";
import { reducer as movieListReducer } from './movieList';
import { reducer as cartReducer} from './cart'

const rootReducer = combineReducers({
    movieList: movieListReducer,
    cart: cartReducer
});

export default rootReducer;
