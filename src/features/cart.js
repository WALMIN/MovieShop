import { createAction, createReducer } from "@reduxjs/toolkit";

const updateSubtotal = createAction('updateSubtotal');
const updatePayment = createAction('updatePayment');

const actions = { updateSubtotal, updatePayment };

const initialState = {
  subtotal: 0,
  payment: []
};

const reducer = createReducer(initialState, {
  [updateSubtotal] : (state, action) => {
    return {
     subtotal: action.payload
    }

  },
  [updatePayment] : (state, action) => {
    return {
     payment: action.payload
    }

  }

});

export { actions, reducer };
