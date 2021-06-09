import '../css/Jumbotron.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as jumboAction, STATUS } from "../features/jumboLoader";
import defaultImg from '../img/movielogo.jpg';
import { waitFor } from '@testing-library/dom';
import { useHistory } from 'react-router';


const Jumbotron = () => {
    const randomMovieSelector = useSelector(state => state.jumboLoader.randomMovie);
    const status = useSelector(state => state.jumboLoader.status);
    const dispatch = useDispatch();
    const history = useHistory();

    let randomMovie = null;


    if (status === STATUS.NORMAL) {
        randomMovie = null;
        //console.log('status: ', status);


    } else if (status === STATUS.IS_FETCHING) {
        //console.log('status: ', status);


    } else if (status === STATUS.SUCCESS) {
        randomMovie = randomMovieSelector;
        //console.log('random movie success: ', randomMovie);
        //console.log('status: ', status);


    } else {
        randomMovie = null;
        //console.log('status: ', status);
    }

    useEffect(() => {
        fetchJumbotronMovie(dispatch);
    }, []);


    return (randomMovie !== null) ? (

        <div className="jumbotron" 
        style={{ backgroundImage: 
        "linear-gradient(rgba(15, 15, 15, 0.7), rgba(10, 10, 10, 0.96)), url("+ "https://image.tmdb.org/t/p/w500/" + randomMovie.poster_path + ")" 
        }}>

            {console.log('randomMovie: ', randomMovie)}

            <div className="synopsis">

                <h1>{randomMovie.original_title}</h1>
                <br></br>
                <p>{randomMovie.overview}</p>
                <br></br>
                <button onClick={() => {
                    history.push(`/MovieInfo/${randomMovie.id}`)
                }}>More Info</button>

            </div>

        </div>

    ) : null

}

function getRandomIndex(maxLength,) {
    return Math.floor(Math.random() * maxLength);
}

async function fetchJumbotronMovie(dispatch) {

    //dispatch(actions.reset()); //reset OM DU går in på sidan igen, ska ligga i redux såklart
    dispatch(jumboAction.isFetching());
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
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

            const genreArray = data.results

            const randomIndex = getRandomIndex(genreArray.length-1)

            //console.log('genre array: ', genreArray[randomIndex])

            dispatch(jumboAction.success(
                genreArray[randomIndex]
            ))



        })
        .catch(error => {
            console.error('There was an error!', error);
        });

}


export default Jumbotron;