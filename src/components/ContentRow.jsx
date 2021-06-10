import '../css/ContentRow.css';
import React, {useState, useEffect} from 'react';
import defaultImg from '../img/movielogo.jpg';
import { useSelector } from 'react-redux';
import { waitFor } from '@testing-library/dom';



const ContentRow = ({item}) => {
    let imgPath = null;
    let img = null;
    //console.log('kmr vi hit?')
    //console.log('Content row Item: ', item)

    if(item.poster_path != null) {
        imgPath = item.poster_path;
        img = "https://image.tmdb.org/t/p/w500/" + imgPath;

        
        return( 
            <React.Fragment>
                <img className="poster-img" src={img} alt="No image available"/>
            </React.Fragment>  
        )
    }

    return( 
        <React.Fragment>
            <img className="poster-img" src={`${defaultImg}`} alt="No default image available"/>
            <p className="alt-img-title">{item.original_title}</p>
        </React.Fragment> 
    )
}

export default ContentRow;