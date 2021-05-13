import { createAction, createReducer } from "@reduxjs/toolkit";


const isFetching = createAction('is fetching');
const succsess = createAction('succsess');
const faliure = createAction('faliure');

const actions = {isFetching, succsess, faliure};

const STATUS = {
    NORMAL: 'normal',
    FETCHING: 'is fetching',
    SUCCSESS: 'succsess',
    FALIURE: 'faliure'
}

const initialState = {
    status: STATUS.NORMAL,
    fact: null
}

const reducer = createReducer(initialState, {
    [isFetching]: (state, action) => ({
        //skriver en funktion som returnerar våran nya state
        //...state = gör en kopia på den staten vi har 
        ...state,
        //statuset i objectet ändrar vi till status.fetching 
        status: STATUS.FETCHING
    }),

    [succsess]: (state, action) => ({
        status: STATUS.SUCCSESS,
        fact: action.payload
    }),

    [faliure]: (state, action) => ({
        ...state,
        status: STATUS.FALIURE
    })

    

})

export {actions, reducer, STATUS};

