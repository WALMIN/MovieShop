import { createAction, createReducer } from "@reduxjs/toolkit";

const addFavourites = createAction('add');
const deleteFavourites = createAction('delete');

const actions = { addFavourites, deleteFavourites };

const initialState = {
  items: [    [0,"Batman Begins", "https://sfanytime-images-prod.secure.footprint.net/COVERM/ba242472-c422-41dd-a724-9f81010f54bf_COVERM_01.jpg?w=375&fm=pjpg&s=cd8710e230dbe303f7f9795a38beba57"],
  [1,"The Dark Knight", "https://sfanytime-images-prod.secure.footprint.net/COVERM/COVERM_b9e21514-0507-4965-a0a4-7ebb3971dd90_01.jpg?w=375&fm=pjpg&s=14f65063145150c9ab0b824200da9075"],
  [2,"The Dark Knight Rises", "https://static0.colliderimages.com/wordpress/wp-content/uploads/the-dark-knight-rises-imax-poster.jpeg"]]
};


const reducer = createReducer(initialState, {
    [addFavourites] : (state, action) => {
      
  
      return {
       ...state,
       items: [...state.items, action.payload],
       
      }
  
    },
    [deleteFavourites] : (state, action) => {
      
    const filteredItems = state.items.filter(item => item[0] !== action.payload);
  
      return {
        ...state,
        items: filteredItems
        
       }
  
    }
  
  });
  export { actions, reducer };