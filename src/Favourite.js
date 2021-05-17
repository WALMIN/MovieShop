import React from 'react';
import './Favourite.css';

function myFavourites{
return(
   <div className="Title">
       <h1>Dina sparade filmer</h1>
       <div className= "moviePosters">
           {favourites.map}(favourites => (

           <img src= {movie.poster} alt = {movie.name}/>
       ))
       </div>
   </div>

)
}

export default myFavourites;