import { createAction, createReducer } from "@reduxjs/toolkit";

const addItem = createAction('add');
const deleteItem = createAction('delete');

const actions = { addItem, deleteItem };

const initialState = {
  items: []
};

const reducer = createReducer(initialState, {
  [addItem] : (state, action) => {
    return {
     ...state,
     items: [...state.items, action.payload]

    }

  },
  [deleteItem] : (state, action) => {
    const filteredItems = state.items.filter(item => item[0] !== action.payload);

    return {
      ...state,
      items: filteredItems
     }

  }

});

export { actions, reducer };
