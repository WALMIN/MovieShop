import { createAction, createReducer } from "@reduxjs/toolkit";

const addItem = createAction('add');
const deleteItem = createAction('delete');

const actions = { addItem, deleteItem };

const initialState = {
  items: [
    [0, "Batman Begins", "https://sfanytime-images-prod.secure.footprint.net/COVERM/ba242472-c422-41dd-a724-9f81010f54bf_COVERM_01.jpg?w=375&fm=pjpg&s=cd8710e230dbe303f7f9795a38beba57", 99]
  ],
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
