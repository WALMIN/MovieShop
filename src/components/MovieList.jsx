import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {actions, STATUS} from "../features/movieList"


const MovieList = () => {
    const status = useSelector(state => state.movieList.status);
    const fact = useSelector(state => state.movieList.fact);

    const dispatch = useDispatch();
    let content = null; 

    if(status === STATUS.NORMAL) {
        content = "Redo För Lite Fakta!";
    } else if (status === STATUS.FETCHING) {
        content = "Väntar på fakta";
    } else if (status === STATUS.SUCCSESS) {
        content = fact;
    } else {
        content = "kunde inte hämta fakta"
    }

    useEffect(() => {
        fetchAllData(dispatch);
    }, [dispatch]);

    if(fact === null) {
        return (
            <div>Empty list</div>
        )
    } else {
        return (
            <div>
                {fact.map((item) => (
                    <ListItem item={item} key={item.id}></ListItem>
                ))}
            </div>
        )
    }
}

const ListItem = ({item}) => {
    return (
        <div key={item.id}>
            <p>{item.name}</p>
            <EachGenreMovies item={item}/>
            
        </div>
    )
}

const EachGenreMovies = ({item}) => {
    const genreUrl = `https://api.themoviedb.org/3/genre/${item.id}/movies?api_key=3dbd54ecb77c41b970728ba04b569d4c&page_size=1`;
    console.log("Fetching data...")
    //console.log(genreUrl)
    const fact = [];


    fetch(genreUrl)
        .then(async response => {
            const data = await response.json();
  
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
  
            const vArr = JSON.stringify(data.results)
  
            JSON.parse(vArr).forEach((props) => {
                console.log('Each result Item' + props.results);
                //const item = createGenreItem(String(props.id), props.name)
                fact.push(props);  
            });
  
            //dispatch(actions.succsess(fact));
            console.log(fact);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });


        return (
            <div>
                <p>movie: </p>
            </div>
        )
}

function fetchAllData(dispatch) {

    dispatch(actions.isFetching());
    const baseUrl = 'https://api.themoviedb.org/3/genre/movie/list';
    const apiKey = '3dbd54ecb77c41b970728ba04b569d4c';
    let url = `${baseUrl}?api_key=${apiKey}`;
    console.log("Fetching data...")
    //console.log(url)
    const fact = [];
  
  
    fetch(url)
        .then(async response => {
            const data = await response.json();
  
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
  
            const vArr = JSON.stringify(data.genres)
  
            JSON.parse(vArr).forEach((props) => {
                console.log('Each ITEM' + props.id + ', ' + props.name);
                const item = createGenreItem(String(props.id), props.name)
                fact.push(item)  
            });
  
            dispatch(actions.succsess(fact));
            console.log(fact);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }
  
  
  function createGenreItem(id, name) {
  
    return {
        id, 
        name
  
    };
  
  }

export default MovieList;