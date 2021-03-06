import { combineReducers } from "redux";
import { reducer as movieListReducer, reducer } from './movieList';
import { reducer as cartReducer} from './cart';
import { reducer as jumbotronReducer} from './jumboLoader';

const rootReducer = combineReducers({
    movieList: movieListReducer,
    cart: cartReducer,
    jumboLoader: jumbotronReducer
});

export default rootReducer;
