import React, {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from "react-redux"; 
import {actions, STATUS} from "../features/movieList" 

 
const MovieList = () => { 
   const status = useSelector(state => state.movieList.status); 
   const arrayGenre = useSelector(state => state.movieList.arrayGenre); 
   const arrayMovieList = useSelector(state => state.movieList.arrayMovieList); 
   const dispatch = useDispatch(); 
 
   useEffect(() => { 
       fetchAllGenres(dispatch); 
   }, [dispatch]); 
 
//SUCCSESS: 'succsess', 
//FALIURE: 'faliure' 
 
   if(status === STATUS.NORMAL) { 
        return ( 
            <div> 
                <h1>{STATUS.NORMAL}</h1> 
                {console.log('Redo för att ladda fakta! Börjar hämta alla genres!')} 
            </div> 
        ) 
    } else if (status === STATUS.FETCHING_GENRES) { 
        return ( 
            <div> 
                <h1>{STATUS.FETCHING_GENRES}</h1> 
                {console.log('Hämtar nu alla genres')} 
            </div> 
        ) 
    } else if (status === STATUS.SUCCESS_GENRES) { 
        return ( 
            <div> 
                <h1>{STATUS.SUCCESS_GENRES}</h1> 
                {console.log('Nu är arrayGenre klar')} 
                    <div> 
                        {arrayGenre.map((item) => (
                            <EachGenreItem id={item.id} name={item.name} dispatch={dispatch}/> 
                        ))} 
                    </div> 
            </div> 
        ) 
    } else if (status === STATUS.FETCHING_MOVIES_BY_GENRE) { 
        return ( 
            <div> 
                <h1>{STATUS.FETCHING_MOVIES_BY_GENRE}</h1> 
                 
                {/* map:ar alla i arrayGenre till en <p> */} 
                {console.log('Hämtar nu alla MOVIES enligt GENRES....')} 
       
                  
            </div> 
        ) 
    } else if (status === STATUS.SUCCESS_MOVIES) { 
        return ( 
            <div> 
                <h1>{STATUS.FETCHING_MOVIES_BY_GENRE}</h1> 
                <p>{'Alla MOVIES nu hämtade utifrån GENRE'}</p> 
 
                 <div> 
                    {arrayGenre.map((item) => (
                        <EachGenreItem id={item.id} name={item.name}/> 
                    ))} 
                </div> 
            </div> 
        ) 
    }  
    else if (status === STATUS.SUCCSESS) { 
        return ( 
            <div> 
                <h1>{STATUS.SUCCSESS}</h1> 
                <p>{'Alla GENRES och MOVIES nu klara'}</p> 
 
            </div> 
        ) 
    } 
    else if (status === STATUS.FALIURE) { 
        return ( 
            null 
        ) 
    } 
 
} 
const EachGenreItem = (props, dispatch) => { 
     
        console.log("PROPR", props) 
     
        return( 
            <div> 
                <p>ID: {props.id}</p> 
                <p>NAME: {props.name}</p> 
                <EachMovieItem props={props} dispatch={dispatch}/> 
            </div> 
     
        ); 
    } 
   
const EachMovieItem = (props) => {
    const arrayMovieList = useSelector(state => state.movieList.arrayMovieList); 
    console.log("Each genre props: ", props.props) 

    useEffect(() => { 
        fetchEachGenresMovies(props, props.dispatch)
    }, [props.dispatch]); 
    
     
    return( 
    <div> 
        <p>
            {
                arrayMovieList.map((item) => (
                    <p>MOVIE NAME: {item.original_title}</p>
                ))
            }
        </p> 
    </div> 
     
    ); 
}

function fetchAllGenres(dispatch) { 
 
       dispatch(actions.isFetching()); 
     
       const baseUrl = 'https://api.themoviedb.org/3/genre/movie/list'; 
       const apiKey = '3dbd54ecb77c41b970728ba04b569d4c'; 
       let url = `${baseUrl}?api_key=${apiKey}`; 
       console.log("Fetching data...") 
     
       var tempArray = []; 
      
       fetch(url) 
           .then(async response => { 
               const data = await response.json(); 
                if (!response.ok) { 
                   const error = (data && data.message) || response.statusText; 
                   return Promise.reject(error); 
               } 
     
                const vArr = JSON.stringify(data.genres) 
                // ovan Konverterar datan från [genre:[object: object, object: object, ... , osv]] till en [{ id: value, title: value, ...}, { id: value, title: value, ...}] 

                // JSON.parse gör om vArr [{ id: value, title: value, ...}, { id: value, title: value, ...}] till [object: object, object: object] igen fast utan genre: innan 
                JSON.parse(vArr).forEach((props) => { 
     
                   console.log('Each ITEM' + props.id + ', ' + props.name); 
     
                   //Skapar ett nytt item genom egen function, skickar med variablar som finns i objektet (id & name) 
                   const genreItem = createGenreItem(props.id, props.name); 
     
                   //Denna pushar varje item som nu är ex. - { id: 22, name: 'action' } enligt createGenreItem, du kan döpa om dessa med 
                   tempArray.push(genreItem) 
     
               }); 
     
               // Arrayn är klar här, allting har pushats i forEach 
               // Uppdatera våran state.arrayGenres i [movieList.js] med tempArray som nu är [ { id: 22, 'action'},  { id: 55, 'drama'}, etc.. etc..] 
                 //dispatch(actions.successAllGenres()); 
                dispatch(actions.listGenreFetched(tempArray));
                dispatch(actions.successAllGenres());          
           }) 
           .catch(error => { 
               console.error('There was an error!', error); 
           }); 
     } 

    function fetchEachGenresMovies(props) {
        console.log('props.id ::::::::    ' + props.props.id )
        const dispatch = props.props.dispatch
        //dispatch(actions.isFetching()); 
        var movieTempArray = []; 

        const genreUrl = `https://api.themoviedb.org/3/genre/${props.props.id}/movies?api_key=3dbd54ecb77c41b970728ba04b569d4c&page_size=1`; 

        fetch(genreUrl)    
                .then(async response => { 
                    const data = await response.json(); 
     
                    if (!response.ok) { 
                        const error = (data && data.message) || response.statusText; 
                        return Promise.reject(error); 
                    } 
                    const vArr = JSON.stringify(data.results) 
                    // console.log(vArr) 
                      // ovan Konverterar datan från [results:[object: object, object: object, ... , osv]] till en [{ id: value, original_title: value, ...}, { id: value, original_title: value, ...}] 
     
                    // JSON.parse gör om vArr [{ id: value, original_title: 'Batman', ...}, { id: value, original_title: 'Nicolinas äventyr', ...}] till [object: object, object: object] igen fast utan genre: innan 
                    JSON.parse(vArr).forEach((props) => { 
                        console.log('Each result title ' + props.original_title + ' in GENRE: '); 
                        const item = createMovieItem(props.original_title) 
                        movieTempArray.push(props); 
                         
                    }); 
     
                    console.log('Laddar nästa..') 
                    console.log('Movie temp array' + JSON.stringify(movieTempArray));
                    dispatch(actions.listMoviesFetched(movieTempArray)); 
                    dispatch(actions.successAllMovies()); 
                  
     
                     
                }) 
                .catch(error => { 
                    console.error('There was an error!', error); 
                }); 
    }
      
    function createGenreItem(id, name) { 
        return { 
            id, 
            name 
        }; 
    } 
     
    function createMovieItem(original_title) { 
        return { 
            original_title 
        }; 
    } 

export default MovieList;