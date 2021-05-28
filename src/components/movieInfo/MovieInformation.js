import React, { Component } from "react";
import './MovieInformation.css';
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {FaStar} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";



const POSTER_URL = "https://image.tmdb.org/t/p/w500"
const MOVIE_PRICE = 79
//const arrayMovieList = useSelector(state => state.movieList.arrayMovieList);

/*const mapStateToProps = (state) => {
    return{
    arrayMovieList: state.movieList.arrayMovieList
    }
  }*/
class MovieInformation extends Component {
    state ={
       apiResponse:null,
       cart:[]
   };
   
   
   async componentDidMount() {
    const m_id = this.props.id;
    console.log("Movie Id"+ m_id);
    const api_key="?api_key=3dbd54ecb77c41b970728ba04b569d4c"
    //const movie_url = "https://api.themoviedb.org/3/movie/106646?api_key=3dbd54ecb77c41b970728ba04b569d4c";
    const url = "https://api.themoviedb.org/3/movie/";
    const movie_url=url+m_id+api_key;
    const response = await fetch(movie_url);
    const data = await response.json();
    this.setState({ apiResponse: data});
    
    //const arrayMovieList = useSelector(state => state.movieList.arrayMovieList);
   /* const arrayMovieList = this.props.arrayMovieList;
    console.log("Data value inside Movieinformation:" + this.props.arrayMovieList);*/

    //Cart 
    const localCart = localStorage.getItem("cart");
    if(localCart) 
    {
        this.setState({cart:JSON.parse(localCart)});
    }
  }

  

  addItem = (id,newItem) => {
    let newCart = this.state.cart;
    let existingItem = null;
    console.log("Cart"+ newCart);
    if (newCart) { existingItem = newCart.find(item => item.id === id);}
    // Add to quantity if items exist or add new item    
    if (existingItem) 
    {
      existingItem.quantity += 1;
    } else 
    {
        console.log("New Cart" + newItem.title);
        newCart.push(newItem);
    }
    // Save state & local storage    
    this.setState({cart:newCart});
    let stringCart = JSON.stringify(newCart);
    localStorage.setItem("cart", stringCart) 
  }
  
    render(){
        
        if (!this.state.apiResponse) {
            
            return <div>didn't get a Data</div>;
          }
        return (
            

            <div className="viewMovieDetails">
            <div className="poster_img">
                <img src= { POSTER_URL + this.state.apiResponse.poster_path } alt="" />
            </div>

            <div className="movieBox">
                <div className="movieTitle">
                    <h2> {this.state.apiResponse.title} </h2>
                    <span> ${MOVIE_PRICE + this.state.apiResponse.vote_average} </span>
                </div>
                <div className="release_status">({this.state.apiResponse.status})
                    <span className="lang">
                        <b>{this.state.apiResponse.original_language}</b>
                    </span>
                </div>
                <div className="ratings">
                    <p> <FaStar style={{color:"yellow"}}/>
                    <span className="rating_value">{this.state.apiResponse.vote_average} </span>
                    <span className="vote_counts">{this.state.apiResponse.vote_count.toLocaleString("en-US")} votes</span>
                    </p>
                </div>       
                <div className="runtime">
                    <p>{this.state.apiResponse.runtime} <i>minutes</i></p>
                  
                <div className="genres">
                    <p className="classGenres" >  { 
                            this.state.apiResponse.genres.map((gen)=>
                                gen.name 
                             ) +" "

                        }    </p>
                   
                </div>
                </div>
              
                <div className="overview">
                    <h3><u>Overview</u></h3>  
                    <p>{this.state.apiResponse.overview} </p>
                    
                </div>
                
                <section className="technicalInfo"> 
                       <h3><u>Technical Information</u></h3>
                        
                        <div className="release-date">
                            <p> <b>Released Date:</b> {this.state.apiResponse.release_date}</p>
                        </div>
                        <div className="spoken-languages">
                            <p><b>Spoken Languages:</b> {this.state.apiResponse.spoken_languages.map((sp_lang)=> sp_lang.english_name) + " " }</p>
                        </div>
                        <div className="homepage"> 
                            <p> <a id="hmpage" href = {this.state.apiResponse.homepage} target="_blank">Visit Site</a></p>
                        </div>
                        <div className="production-companies">
                            <h4>Credits</h4>
                            <h4>Production Companies:</h4>
                            <p>{this.state.apiResponse.production_companies.map((prd_comp)=> prd_comp.name) + " "}</p>
                        </div>
                        <div className="revenue"> 
                            <p><b>Revenue:</b>{this.state.apiResponse.revenue.toLocaleString("en-US")} USD</p>
                        </div>
                        <div className="budget"> 
                            <p><b>Budget:</b>{this.state.apiResponse.budget.toLocaleString("en-US")} USD</p>
                        </div>
                        <div className="popularity"> 
                            <p><b>Popularity:</b>{this.state.apiResponse.popularity} </p>
                        </div>
                        
                </section>
                <br/>
                    <div className="addCart">
                            <Link to="/Cart" className="cart" onClick={ () => this.addItem(this.state.apiResponse.id, {id: this.state.apiResponse.id, title: this.state.apiResponse.title, img: POSTER_URL + this.state.apiResponse.poster_path, price: MOVIE_PRICE+this.state.apiResponse.vote_average, quantity: 1}) }> ADD TO CART </Link>
                    </div>
                </div>
            </div>
        )
    }
    
}



export default MovieInformation;
