import { createAction, createReducer } from "@reduxjs/toolkit";

const isFetching = createAction('is fetching jumbotron');
const success = createAction('jumbotron success');
const faliure = createAction('jumbotron faliure');
const resetList = createAction('jumbotron reset');

const actions = {isFetching, success, faliure, resetList};

const STATUS = {
    NORMAL: 'normal',
    IS_FETCHING: 'is fetching',
    SUCCESS: 'success',
    FALIURE: 'faliure',
}

const initialState = {
    status: STATUS.NORMAL,
    randomMovie: null,
}

const reducer = createReducer(initialState, {

    [isFetching]: (state, action) => ({
        ...state,
        status: STATUS.IS_FETCHING
    }),

    [success]: (state, action) => ({
        //console.log('action movie reducer: ', action.payload)
        ...state,
        status: STATUS.SUCCESS,
        randomMovie: action.payload
    }),
    
    [faliure]: (state, action) => ({
        ...state,
        status: STATUS.FALIURE
    }),
    
    [resetList]: (state, action) => ({
        ...state,
        status: STATUS.NORMAL
    }),
})

export {actions, reducer, STATUS};

