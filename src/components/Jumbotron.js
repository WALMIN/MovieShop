import '../css/Jumbotron.css';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { waitFor } from '@testing-library/dom';


const Jumbotron = () => {
    const arrayMovieList = useSelector(state => state.movieList.arrayMovieList); 
    const [randomMovieIndex, setRandomMovieIndex] = useState(0);
    //setRandomMovieIndex(getRandomIndex(arrayMovieList.length));
    //console.log('ArrayMovieList: HÄRRR');

    //console.log('ARRAY MOVIELIST:', arrayMovieList)
    

    //let content = null;
    let posterPath = null;
    let img = null
    let randomIndex = 0;
    console.log('Movei index random:   ' + randomMovieIndex);
    
    if(arrayMovieList.length > 0) {
        //content = arrayMovieList[0].adult;
        randomIndex = getRandomIndex(arrayMovieList.length)
        posterPath = arrayMovieList[randomIndex].backdrop_path;
        //console.log('CONTENT: ', content)
        //console.log('poster PAth: ', posterPath)


        //use img from api
        img = "https://image.tmdb.org/t/p/w500/" + posterPath;
        //document.body.appendChild(img);

        


        /*waitFor(arrayMovieList => {
            console.log('ARRAY MOVIELIST:', arrayMovieList)
        })*/
        //console.log('ARRAY MOVIELIST:', arrayMovieList)

        //useEffect(() => { 
         //   let randomIndex = Math.floor(Math.random() * arrayMovieList.length);
        //setRandomMovieIndex(randomIndex);
        //}, []); 
        //const randomIndex = Math.floor(Math.random() * arrayMovieList.length);
        //setRandomMovieIndex(randomIndex);

        //console.log('INDEXETTTTT::::: ', randomMovieIndex);
        //console.log('Random movie INDEX MOVIE: ', arrayMovieList[randomMovieIndex]);
    
    /*arrayMovieList.map(eachMovie => (
        randomMovie = eachMovie[Math.floor(Math.random() * arrayMovieList.length)]
    ))*/
    
    //arrayMovieList[Math.floor(Math.random() * arrayMovieList.length)];
    //style={`background-image: ${img};`}
    //<p>RANDOM INDEX {randomIndex}</p>
    var bg = img
        return( 
            <div className="jumbotron" style ={ { backgroundImage: "url("+bg+")" } }>
                <div className="synopsis">
                    {/*Vi vill ha en logo här*/}
                    <h1>{arrayMovieList[randomIndex].original_title}</h1>
                    <p>{arrayMovieList[randomIndex].overview}</p>
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
    /*} else {
        return (
            <div>Tom arrayMovieList</div>
        )
    }*/
}

function getRandomIndex(max, ) {
    return Math.floor(Math.random() * max);
}


export default Jumbotron;