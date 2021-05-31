import { createAction, createReducer } from "@reduxjs/toolkit";

const updateTotal = createAction('updateTotal');

const actions = { updateTotal };

const initialState = {
  total: 0
};

const reducer = createReducer(initialState, {
  [updateTotal] : (state, action) => {
    return {
     total: action.payload
    }

  }

});

export { actions, reducer };
