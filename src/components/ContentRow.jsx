import '../css/ContentRow.css';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { waitFor } from '@testing-library/dom';



const ContentRow = ({item, genreName}) => {
    const arrayMovieList = useSelector(state => state.movieList.arrayMovieList); 
    let imgPath = null;
    let img = null;

    if(item != null) {
        imgPath = item.poster_path;
        img = "https://image.tmdb.org/t/p/w500/" + imgPath;

        return( 
            //<div className="block-wrapper"> 4
            <React.Fragment>
                <img className="poster-img" src={img} alt="No image available"/>
            </React.Fragment>
            //</div>
            
        )
    }

    return( 
        <div>
            <p>Emptyness</p>
        </div>
    )
}

export default ContentRow;