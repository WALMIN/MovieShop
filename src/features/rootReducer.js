import { combineReducers } from "redux";
import { reducer as movieListReducer } from './movieList';
import { reducer as favouriteListReducer} from './favouriteList'
import { reducer as cartReducer} from './cart'

const rootReducer = combineReducers({
    movieList: movieListReducer,
    favouriteList: favouriteListReducer,
    cart: cartReducer
});

export default rootReducer;
