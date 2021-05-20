import { createAction, createReducer } from "@reduxjs/toolkit";

const addItem = createAction('add');
const deleteItem = createAction('delete');

const actions = { addItem, deleteItem };

const initialState = {
  items: [],
  total: 0
};

const reducer = createReducer(initialState, {
  [addItem] : (state, action) => {
    let newTotal = state.total + action.payload[3];

    return {
     ...state,
     items: [...state.items, action.payload],
     total: newTotal
    }

  },
  [deleteItem] : (state, action) => {
    let newTotal = state.total - action.payload[1];
    const filteredItems = state.items.filter(item => item[0] !== action.payload[0]);

    return {
      ...state,
      items: filteredItems,
      total: newTotal
     }

  }

});

export { actions, reducer };
