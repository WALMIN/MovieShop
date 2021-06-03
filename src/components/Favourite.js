import React from 'react';
import './Favourite.css';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../features/favouriteList';

function Favourites() {
  const favouriteList = useSelector(state => state.favouriteList.items);


  const dispatch = useDispatch();
  const deleteFromFavourites = (id) => {
    dispatch(actions.deleteFavourites(id));

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

          <div   className= "MovieContainer">

            <div className="MoviePoster" >

              <img src={product[2]} />

              <p className="MovieTitle">{product[1]}</p>

            </div>


            <div className="RemoveFavourites">
              
              {

              show?<img src={(process.env.PUBLIC_URL + "/images/clear.svg")} onClick={()=>deleteFromFavourites(product[0])}/>:null
              
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