import React, { Component } from "react";
import './MovieInformation.css';
import star from "../../images/star.png";

const POSTER_URL = "https://image.tmdb.org/t/p/w500"

class MovieInformation extends Component {
    state ={
       apiResponse:null
   };

   async componentDidMount() {
    const url = "https://api.themoviedb.org/3/movie/106646?api_key=3dbd54ecb77c41b970728ba04b569d4c";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ apiResponse: data});
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
                            <span> €72 </span>
                        </div>
                        <p className="release_status">({this.state.apiResponse.status})</p>
                        <div className="ratings">
                            <p><img className="starIcon" src={star} alt="" /> 
                            <span className="rating_value">{this.state.apiResponse.vote_average} </span>
                            <span className="vote_counts">{this.state.apiResponse.vote_count.toLocaleString("en-US")} votes</span>
                            </p>
                            <span className="lang">
                            <p><b>{this.state.apiResponse.original_language}</b></p>
                            </span>
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
                            <p> <b>Overview:</b> <br /> {this.state.apiResponse.overview} </p>
                            <button className="cart"> ADD TO CART </button>
                        </div>
                        <div className="technicalInfo"> 
                                <h4>Technical Information:</h4>
                                <p className="release-date">
                                    <h6>Released Date:</h6> {this.state.apiResponse.release_date}</p>
                                <p className="spoken-languages">
                                    <h6>Spoken Languages:</h6>{this.state.apiResponse.spoken_languages.map((sp_lang)=> sp_lang.english_name) + " " }</p>
                                <p className="production-companies">
                                    <h6>Credits</h6>
                                    <h6>Production Companies:</h6>{this.state.apiResponse.production_companies.map((prd_comp)=> prd_comp.name) + " "}</p>
                                <p className="revenue"> 
                                    <h6>Revenue:</h6>{this.state.apiResponse.revenue.toLocaleString("en-US")} USD</p>
                                <p className="budget"> 
                                    <h6>Budget:</h6>{this.state.apiResponse.budget.toLocaleString("en-US")} USD</p>
                                <p className="homepage"> 
                                    <h6>Visit:</h6> <a href = {this.state.apiResponse.homepage}>{this.state.apiResponse.homepage}</a></p>
                        </div>
                    </div>
            </div>
        )
    }
}

export default MovieInformation
