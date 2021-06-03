import '../css/Jumbotron.css';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { waitFor } from '@testing-library/dom';


const Jumbotron = () => {
    const arrayMovieList = useSelector(state => state.movieList.arrayMovieList); 
    const [randomMovieIndex, setRandomMovieIndex] = useState(0);

    let randomMovieArray = [];
    let posterPath = null;
    let img = null
    let randomIndex = 0;
    let randomIndex1 = 0;
    
    if(arrayMovieList.length > 0) {
        randomIndex = getRandomIndex(arrayMovieList.length);
        randomMovieArray = arrayMovieList[randomIndex].movies;

        randomIndex1 = getRandomIndex(randomMovieArray.length);
        posterPath = randomMovieArray[randomIndex1].backdrop_path;
        
        img = "https://image.tmdb.org/t/p/w500/" + posterPath;
        
    var bg = img
        return( 
            <div className="jumbotron" style ={ { backgroundImage: " linear-gradient(rgba(255, 99, 71, 0), rgba(20, 20, 20, 0.82)), url("+bg+")" } }>
                <div className="synopsis">
                    {/*Vi vill ha en logo här*/}
                    <h1>{randomMovieArray[randomIndex1].original_title}</h1>
                    <br></br>
                    <p>{randomMovieArray[randomIndex1].overview}</p>
                    <br></br>
                    <button>More Info</button>
                    <p>RANDOM INDEX {randomIndex}</p>
                </div>
            </div>
        )
    }

    return( 
        <div className="jumbotron" >
            <p>Adult Yes? no? </p>
            

        </div>
    )
}

function getRandomIndex(max, ) {
    return Math.floor(Math.random() * max);
}


export default Jumbotron;