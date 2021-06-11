import React from 'react';
import './Favourite.css';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
import defaultImg from '../img/movielogo.jpg';


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
        <h1>Favourites</h1>

        <img className="EditButton" src={show ? (process.env.PUBLIC_URL + "/images/save.svg") : (process.env.PUBLIC_URL + "/images/edit.svg")} onClick={()=>setShow(!show)}/>

      </header>

      <div className= "RowItem">
        <div className="MovieItems">
          {favouriteList.map(product =>

          <div className ="MovieContainer">
            <Link style={{textDecoration: "none"}} to={`/MovieInfo/${product.id}`}>
              <div className="MoviePoster" >
                { product.img !== "https://image.tmdb.org/t/p/w500null" ?
                <div>
                  <img src={product.img} alt={product.title} />
                </div>
                :
                <div>
                  <img src={defaultImg} alt={product.title} />
                </div>
                }

                <p className="MovieTitle">{product.title}</p>
              </div>
            </Link>

            <div className="RemoveFavourites">
              { show ?
                <img src={(process.env.PUBLIC_URL + "/images/delete.svg")} onClick={()=>removeFavourites(product.id)}/>
                : null
              }
            </div>
        </div>



        )}

      </div>





      </div>


    </div>

  )
}

export default Favourites;
