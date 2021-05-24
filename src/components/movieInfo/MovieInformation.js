import React, { Component } from "react";
import './MovieInformation.css';



const POSTER_URL = "https://image.tmdb.org/t/p/w500"
const MOVIE_PRICE = 79

class MovieInformation extends Component {
    state ={
       apiResponse:null
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
                <p><img className="starIcon" src={(process.env.PUBLIC_URL + "/images/star.png")} alt="" /> 
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
                    <p> <b>Overview</b> <br /> {this.state.apiResponse.overview} </p>
                    
                </div>
                
                <section className="technicalInfo"> 
                       <h4><u>Technical Information</u></h4>
                        
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
                
                    <div className="addCart">
                            <button className="cart"> ADD TO CART </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieInformation
