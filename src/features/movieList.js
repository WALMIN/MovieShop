import { createAction, createReducer } from "@reduxjs/toolkit";

const isFetching = createAction('is fetching GENRES');
const isFetchingMovieByGenre = createAction('is fetching MOVIES by GENRE');
const successAllGenres = createAction('success genres');
const successAllMovies = createAction('success all movies');
const succsess = createAction('succsess');
const faliure = createAction('faliure');
const listGenreFetched = createAction('genres done fetched');
const listMoviesFetched = createAction('subMovies done fetched');
const resetLists = createAction('resetting Lists');
const pushPartFetch = createAction('fetcher statuses succsess')

const actions = { isFetching, isFetchingMovieByGenre, succsess, successAllGenres, successAllMovies, faliure, listGenreFetched, listMoviesFetched, resetLists, pushPartFetch };

const STATUS = {
    NORMAL: 'normal',
    FETCHING_GENRES: 'Is fetching Genres..',
    FETCHING_MOVIES_BY_GENRE: 'Is fetching Movies by Genres..',
    SUCCESS_GENRES: 'Success GENRES',
    SUCCESS_MOVIES: 'Success MOVIES BY GENRE',
    SUCCSESS: 'succsess',
    FALIURE: 'faliure',
    API_FETCHER_STATUSES_SUCCESS: 'api fetcher statuses success'
}

const initialState = {
    status: STATUS.NORMAL,
    arrayGenre: [],
    arrayMovieList: []
}

const reducer = createReducer(initialState, {

    //STATUSAR
    [isFetching]: (state, action) => ({
    // Skriver en funktion som returnerar våran nya state
    //...state = gör en kopia på den staten vi har 
        ...state,
    //statuset i objectet ändrar vi till status.FETCHING_GENRES -> 'Is fetching Genres..'
        status: STATUS.FETCHING_GENRES
    }),
    
    [successAllGenres]: (state, action) => ({
        ...state,
        status: STATUS.SUCCESS_GENRES
    }),
    
    [isFetchingMovieByGenre]: (state, action) => ({
        ...state,
        status: STATUS.FETCHING_MOVIES_BY_GENRE
    }),
    
    [successAllMovies]: (state, action) => ({
        ...state,
        status: STATUS.SUCCESS_MOVIES
    }),
    
    [succsess]: (state, action) => {
        const value = action.payload;
        state.status = value
    },
    
    [faliure]: (state, action) => ({
        ...state,
        status: STATUS.FALIURE
    }),

    [pushPartFetch]: (state, action) => {


        state.arrayMovieList.push(action.payload)
      
        state.status = STATUS.API_FETCHER_STATUSES_SUCCESS
    },
    
    [listGenreFetched]: (state, action) => {
        const value = action.payload; // Listan som skickats med från functionen (fetchAllGenres)
    // state.arrayGenre.push(value); // Uppdatera [arrayGenre] det vi skickar med i slutet av listan (om vi skickar med ett object här ex. { id: 22, name: action } )
        state.arrayGenre = value // Uppdatera [arrayGenre] med det vi skickar med i action, alltså en hel array [])
    // State.STATUS.SUCCSESS ska inte vara här om du ska hämta alla filmer inom genren sen, så vi är inte klara med fetch här..
    // state.status = STATUS.SUCCSESS
        state.status = STATUS.FETCHING_MOVIES_BY_GENRE // men vi kan lägga en sån här så det blir tydligare
    },
    
    [listMoviesFetched]: (state, action) => {
        const value = action.payload; // Listan som skickats med från functionen (fetchAllMoviesByGenre)
        //console.log('logg i redux movie', value)
        //state.arrayMovieList = [value];
        state.arrayMovieList.push(value) // Uppdatera [arrayMovieList], ... för att sprida ut arrayn, annars är den för stor för att push
    // state.status = STATUS.FETCHING_MOVIES_BY_GENRE // men vi kan lägga en sån här så det blir tydligare
    },
    
    [resetLists]: (state, action) => {
        state.arrayGenre = []
        state.arrayMovieList = []
    },
})

export {actions, reducer, STATUS};

