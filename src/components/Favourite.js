import React from 'react';
import './Favourite.css';

function myFavourites() {

    const products = [
        ["Batman Begins", 99, "https://sfanytime-images-prod.secure.footprint.net/COVERM/ba242472-c422-41dd-a724-9f81010f54bf_COVERM_01.jpg?w=375&fm=pjpg&s=cd8710e230dbe303f7f9795a38beba57"],
        ["The Dark Knight", 109, "https://sfanytime-images-prod.secure.footprint.net/COVERM/COVERM_b9e21514-0507-4965-a0a4-7ebb3971dd90_01.jpg?w=375&fm=pjpg&s=14f65063145150c9ab0b824200da9075"],
        ["The Dark Knight Rises", 119, "https://static0.colliderimages.com/wordpress/wp-content/uploads/the-dark-knight-rises-imax-poster.jpeg"]
      ];
return(
   <div className="Title">
       <h1>Dina sparade filmer</h1>
       <div className= "moviePosters">

           {products.map(product => 

           <img src= {product[2]}/>
       )}
       
       </div>
   </div>

)
}

export default myFavourites;