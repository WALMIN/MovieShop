import React from 'react';
import './Favourite.css';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../features/favouriteList';

function Favourites() {
  const favouriteList = useSelector (state => state.favouriteList.items);
  

  const dispatch = useDispatch();
  const deleteFromFavourites = (id) => {
    dispatch(actions.deleteFavourites(id));

  }




return(
   <div className="Container">
       <header className= "SavedMovies">
       <h1>Dina sparade filmer</h1>
       </header>
       
       <div className= "MoviePoster">

           {favouriteList.map(product => 
           
           <div>

           <img src= {product[2]}/>
          
           <p className="MovieTitle">{product[1]}</p>

           </div>

          
       )}
       
       </div>
   </div>

)
}

export default Favourites;