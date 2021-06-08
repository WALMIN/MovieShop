import React from 'react';
import './Favourite.css';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom';


function Favourites() {
  
  
  const [favouriteList, setFavourite] = useState([]);
  

  // Set state from local storage
  useEffect(() => {
    let localFavourite = localStorage.getItem("favourite");
    localFavourite = JSON.parse(localFavourite);

    if (localFavourite) {
      setFavourite(localFavourite);

     

    }

  }, []);
  
  

  

  

  const removeFavourites = (id) => {
    let newFavourite = [...favouriteList];

    // Remove item from list
    newFavourite = newFavourite.filter(item => item.id !== id);

    // Save state & local storage
    setFavourite(newFavourite);
    let favouriteString = JSON.stringify(newFavourite);
    localStorage.setItem('favourite', favouriteString);

  }




  

  const [show,setShow]= useState(false)
  const [edit,setEdit]= useState(false)
  




  return (
    <div className="Container">
      
      <header className="SavedMovies">
        <h1>Saved Movies</h1>
    
        <img src={(process.env.PUBLIC_URL + "/images/edit.svg")} onClick={()=>setShow(!show)}/>

      </header>
      
      
      <div className= "RowItem">

      <div className="MovieItems">

      

        {favouriteList.map(product =>

      <Link className ="MovieContainer"to={`/MovieInfo/${product.id}`}>
       
       <div>

            <div className="MoviePoster" >

              <img src={product.img} />

              <p className="MovieTitle">{product.title}</p>

            </div>


            <div className="RemoveFavourites">
              
              {

              show?<img src={(process.env.PUBLIC_URL + "/images/clear.svg")} onClick={()=>removeFavourites(product.id)}/>:null
              
              }


            </div>

          </div>
          </Link>



        )}

      </div>

      
      
      

      </div>


    </div>

  )
}

export default Favourites;