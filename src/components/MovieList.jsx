import React, {useState, useEffect} from 'react'; 
import reactDom from 'react-dom';
import { useDispatch, useSelector } from "react-redux"; 
import {actions, STATUS} from "../features/movieList" ;
import ContentRow from '../components/ContentRow';
import '../css/ContentRow.css';
import {Link} from "react-router-dom";
 
const MovieList = () => { 
   const status = useSelector(state => state.movieList.status); 
   const arrayGenre = useSelector(state => state.movieList.arrayGenre); 
   const arrayMovieList = useSelector(state => state.movieList.arrayMovieList); 
   const dispatch = useDispatch(); 

const [list, setList] = useState(null);
 
   useEffect(() => { 
        fetchAllMoviesByGenre(dispatch); 
   }, [dispatch]); 
 
//SUCCSESS: 'succsess', 
//FALIURE: 'faliure' 
 
   if(status === STATUS.NORMAL) { 
        return ( 
            <div> 
                {/*<h1>{STATUS.NORMAL}</h1> */}
                {console.log('Redo för att ladda fakta! Börjar hämta alla genres!')} 
            </div> 
        ) 
    } else if (status === STATUS.FETCHING_GENRES) { 
        return ( 
            <div> 
                {/*<h1>{STATUS.FETCHING_GENRES}</h1> */}
                {console.log('Hämtar nu alla genres')} 
            </div> 
        ) 
    } else if (status === STATUS.SUCCESS_GENRES) { 
        return ( 
            <div> 
                {/*<h1>{STATUS.SUCCESS_GENRES}</h1> */}
                {console.log('Nu är arrayGenre klar')} 
                    
            </div> 
        ) 
    } else if (status === STATUS.FETCHING_MOVIES_BY_GENRE) { 
        return ( 
            <div> 
                {/*<h1>{STATUS.FETCHING_MOVIES_BY_GENRE}</h1>*/}             
                {/* map:ar alla i arrayGenre till en <p> */} 
                {console.log('Hämtar nu alla MOVIES enligt GENRES....')} 
       
                  
            </div> 
        ) 
    } else if (status === STATUS.SUCCESS_MOVIES) { 
    let filteredMovieList = []
    let genreMovie = null;
    
    
         return ( 
            <div className="genre-movie-container"> 
                {console.log('Nu är arrayMovieList klar')} 
                {/*<h1>{STATUS.FETCHING_MOVIES_BY_GENRE}</h1>
                <p>{'Alla MOVIES nu hämtade utifrån GENRE'}</p> */}
                 {/*console.log('Array Movie List: ', arrayMovieList)*/}
                    {arrayMovieList.map((item) => (
                        <div className="movie-row-container"> 
                            <h1 className="genre-title" >{item.name}</h1> 
                            {/*console.log('varje Item: ', item)*/}


                            <div className="content-row-genre-item-movie"> 
                                {item.movies.map((movie) => (
                                    <Link to={`/MovieInfo/${movie.id}`} className="contentrow-link-container">
                                        {/*console.log('varje movie: ', movie)*/}
                                        <ContentRow item={movie} className="content-row-class"/> 
                                    </Link>    
                                ))}
                             </div>

                        </div>
                    ))} 
            </div> 
        ) 
    }  
    else if (status === STATUS.SUCCSESS) { 
        return ( 
            <div> 
                {/*<h1>{STATUS.SUCCSESS}</h1> */}
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

export function fetchAllMoviesByGenre(dispatch) {
  
    //dispatch(actions.reset()); //reset OM DU går in på sidan igen, ska ligga i redux såklart
    dispatch(actions.isFetching());
    const baseUrl = 'https://api.themoviedb.org/3/genre/movie/list';
    const apiKey = '3dbd54ecb77c41b970728ba04b569d4c';
    let url = `${baseUrl}?api_key=${apiKey}`;
    console.log("Fetching data...")
    
    fetch(url)
        .then(async response => {
            
            const data = await response.json();
            
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            
            const genreArray = JSON.stringify(data.genres)
         
            JSON.parse(genreArray).forEach((props) => {

 

                var tempArr = [];
       
                const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3dbd54ecb77c41b970728ba04b569d4c&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&vote_count.gte=7&with_genres=${props.id}`
                
                fetch(genreUrl)
                    .then(async response => {
  
                        const data = await response.json();
  
                        if (!response.ok) {
                            const error = (data && data.message) || response.statusText;
                            return Promise.reject(error);
                        }
                        
                        const movies = data.results;

 

                        const myObj = {
                            "id": props.id,
                            "name": props.name,
                            "movies": movies
                        }

 

                        
                        dispatch(actions.listMoviesFetched(myObj));
                        dispatch(actions.successAllMovies());
                       
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });

            });

    
        })
        .catch(error => {
            console.error('There was an error!', error);
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